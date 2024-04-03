import os
from pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="LangChain App")

pc = Pinecone(api_key=os.environ['PINECONE_API_KEY'])
index_name = "my-chatbot"
embeddings = OpenAIEmbeddings()
vectorstore = PineconeVectorStore(pc.Index(index_name), embeddings, 'text')
llm = ChatOpenAI(
    openai_api_key=os.environ['OPENAI_API_KEY'],
    model_name='gpt-3.5-turbo',
    temperature=0.0
)
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)
qa = ConversationalRetrievalChain.from_llm(
    llm,
    retriever=vectorstore.as_retriever(),
    memory=memory
)

@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/load_example_docs")
def load_example_docs():
  """
  Load example documents for testing purposes.
  """
  # Load PDFs
  loaders = [
      PyPDFLoader("docs/cnn article.pdf"),
      PyPDFLoader("docs/nytimes article 1.pdf"),
      PyPDFLoader("docs/nytimes article 2.pdf")
  ]
  docs = []
  for loader in loaders:
      docs.extend(loader.load())

  # Split
  text_splitter = RecursiveCharacterTextSplitter(
      chunk_size = 1500,
      chunk_overlap = 150
  )
  splits = text_splitter.split_documents(docs)

  vectorstore.add_documents(splits)

  return {"message": "Documents loaded!"}

class ReturnStatus(BaseModel):
  status: str = Field(example="OK")

@app.get("/check")
def check() -> ReturnStatus:
  return {"status": "OK"}

class UrlData(BaseModel):
  url: str

@app.post("/load_webpage")
def load_webpage(url_data: UrlData):
  """
  Load a webpage and split it into chunks of text then store in PineconeDB
  """
  page_url = url_data.url
  print(page_url)
  loader = WebBaseLoader(page_url)
  docs = loader.load()

  # Split
  text_splitter = RecursiveCharacterTextSplitter(
      chunk_size = 1500,
      chunk_overlap = 150
  )
  splits = text_splitter.split_documents(docs)

  vectorstore.add_documents(splits)

  return {"status": "Webpage loaded"}

class QuestionData(BaseModel):
  q: str

@app.post("/question")
def question(question_data: QuestionData):
  question = question_data.q

  result = qa({"question": question})

  return {"answer": result['answer']}
