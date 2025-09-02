import os
from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_google_genai import GoogleGenerativeAIEmbeddings # Removed due to async issues
from dotenv import load_dotenv
from langchain_community.agent_toolkits.sql.base import create_sql_agent
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from django.conf import settings
from django.db import connections

load_dotenv() # Load environment variables

def get_langchain_agent():
    # Ensure Django settings are configured
    if not settings.configured:
        import django
        django.setup()

    # Get Gemini API key from environment variables
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set.")

    # Initialize the LLM (Google Gemini Pro)
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=gemini_api_key) # Use Gemini 1.5 Flash model and Gemini API key
    # embeddings = GoogleGenerativeAIEmbeddings(model="embedding-001", google_api_key=gemini_api_key) # Temporarily removed due to async issues in Django main thread

    # Connect to the Django database
    # Assuming 'default' database connection is used
    db = SQLDatabase.from_uri(os.getenv("DATABASE_URL"), include_tables=['students_student', 'employees_employee', 'blogs_blog', 'blogs_comment'])

    # Create the SQL agent toolkit
    toolkit = SQLDatabaseToolkit(db=db, llm=llm)
    agent_executor_kwargs = {
        "extra_tools": [], # You can add extra tools here if needed
        "agent_type": "zero-shot-react-description",
        "handle_parsing_errors": True,
        "early_stopping_method": "force",
        "verbose": True,
        "agent_kwargs": {
            "prompt": "You are a helpful AI assistant. You can answer general questions and also answer questions about the database by using the available tools. If a question is about the database, use the SQL tools. If you cannot answer a question, just say that you don't know. Do not make up answers.",
        },
    }

    # Create the SQL agent
    agent_executor = create_sql_agent(llm=llm, toolkit=toolkit, **agent_executor_kwargs)

    return agent_executor
