from flask import Flask
from flask import request
from flask import jsonify
import os
from pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Pinecone as PineconeStore
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

app = Flask(__name__)

pc = Pinecone(api_key=os.environ['PINECONE_API_KEY'])
index_name = "my-chatbot"
embeddings = OpenAIEmbeddings()
vectorstore = PineconeStore(pc.Index(index_name), embeddings, 'text')
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

@app.route("/")
def hello_world():
  return "<p>Hello, World!</p>"


@app.route("/load_example_docs")
def load_example_docs():
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

  return "<p>Documents loaded!</p>"

@app.route("/check")
def check():
  return jsonify(status='OK')

@app.route("/load_webpage", methods = ['POST'])
def load_webpage():
  data = request.json
  page_url = data.get('url')
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

  return jsonify(status='Webpage loaded')

@app.route("/question", methods = ['POST'])
def question():
  data = request.json
  question = data.get('q')

  result = qa({"question": question})

  return jsonify(answer=result['answer'])
