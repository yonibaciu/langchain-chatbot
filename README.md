# langchain-chatbot

This chatbot uses the following technologies
- OpenAI LLM
- Pinecone vector DB for RAG (Retrieval Augmented Generation)
- Python Flask
- NextJS
- Tailwind CSS

The langchain-chatbot has two components:

- A flask service that interacts with OpenAI and Pinecone DB using langchain for RAG
- A nextjs app for the UI which communicates with the flask service

## Flask service

Prerequisites:
- You will need to setup an OpenAI account and set `OPENAI_API_KEY` env var locally
- You will need to setup a Pinecone account and set the `PINECONE_API_KEY` env var locally
- Create an index in your Pinecone account called **my-chatbot** for the model OpenAI/text-embedding-ada-002
- Install python modules:
```
pip install -r requirements.txt
```

To run:

```
flask run --port=5001
```

## NextJS app

```
npm run dev
```