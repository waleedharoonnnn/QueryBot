# QueryBot - AI Database Assistant

## Introduction

This project, QueryBot, started as a journey to deepen my understanding of Django REST Framework (DRF). As I progressed, I decided to integrate Langchain to explore its capabilities in building intelligent agents. This led to the creation of QueryBot, a full-stack application that leverages the Google Gemini API to enable natural language querying of a SQL database. It's a demonstration of how modern AI can be combined with robust web development frameworks to create powerful, intuitive tools.

## Description

QueryBot is an intelligent chatbot designed to simplify database interactions. Users can ask questions in natural language, and QueryBot, powered by Google Gemini and Langchain, will interpret these queries, translate them into SQL commands, execute them against a connected database, and provide understandable answers. It also supports general conversational AI for non-database related questions.

## Features

*   **Natural Language to SQL:** Translate user questions into executable SQL queries.
*   **Conversational AI:** Engage in general conversation and answer non-database specific questions.
*   **Database Interaction:** Connects to a SQL database (configured via `DATABASE_URL`).
*   **Google Gemini Integration:** Utilizes the Google Gemini API for powerful language understanding and generation.
*   **Langchain Framework:** Built with Langchain for robust agent orchestration and tool usage.
*   **Full-Stack Application:**
    *   **Backend:** Django REST Framework (DRF) provides a robust and scalable API.
    *   **Frontend:** React (with TypeScript) offers a dynamic and responsive user interface.
*   **Beautiful UI:** A sleek, purple/black themed UI inspired by modern LLM interfaces like ChatGPT and DeepSeek.
*   **Error Handling:** Graceful handling of API errors, parsing failures, and rate limits.
*   **Auto-scroll:** Chat window automatically scrolls to the latest message.
*   **Responsive Design:** Optimized for both mobile and desktop viewing.

## Technologies Used

*   **Backend:**
    *   Python
    *   Django
    *   Django REST Framework
    *   Langchain
    *   `langchain-google-genai`
    *   `python-dotenv`
    *   `asgiref`
*   **Frontend:**
    *   React
    *   TypeScript
    *   Tailwind CSS
    *   `lucide-react` (for icons)
*   **AI/LLM:**
    *   Google Gemini API (`gemini-1.5-flash` model)

## Setup and Installation

Follow these steps to get QueryBot up and running on your local machine.

### Prerequisites

*   Python 3.8+
*   Node.js (LTS recommended)
*   npm or Yarn

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/waleedharoonnnn/QueryBot.git
cd QueryBot
\`\`\`

### 2. Backend Setup (Django)

Navigate to the project root directory.

\`\`\`bash
cd drf
\`\`\`

#### Create a Virtual Environment and Install Dependencies

\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt # (assuming you have a requirements.txt, if not, generate one with `pip freeze > requirements.txt`)
\`\`\`
*(If `requirements.txt` does not exist, you will need to create it by running `pip freeze > requirements.txt` after installing your Django, DRF, Langchain, and Google Generative AI dependencies.)*

#### Database Migrations

\`\`\`bash
python manage.py migrate
\`\`\`

#### Create a Superuser (Optional)

\`\`\`bash
python manage.py createsuperuser
\`\`\`

### 3. Frontend Setup (React)

Navigate to the frontend directory.

\`\`\`bash
cd frontend
\`\`\`

#### Install Dependencies

\`\`\`bash
npm install # or yarn install
\`\`\`

### 4. API Configuration (.env File)

Create a `.env` file in your **project root directory** (i.e., `QueryBot/.env`) with the following content:

\`\`\`
GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
DATABASE_URL="sqlite:///db.sqlite3"
\`\`\`

*   **`YOUR_GOOGLE_GEMINI_API_KEY`**: Replace this with your actual Google Gemini API key. You can obtain one from [Google AI Studio](https://ai.google.dev/).
*   **`DATABASE_URL`**: This example uses a SQLite database. Adjust the URL if you are using a different database (e.g., PostgreSQL, MySQL).

## Usage

### 1. Start the Backend Server

In your project root directory (`QueryBot`), run:

\`\`\`bash
python manage.py runserver
\`\`\`
The backend API will be accessible at `http://127.0.0.1:8000/`.

### 2. Start the Frontend Server

In your `frontend` directory (`QueryBot/frontend`), run:

\`\`\`bash
npm start # or yarn start
\`\`\`
The React development server will start, typically opening at `http://localhost:3000/`.

### 3. Interact with QueryBot

Open your browser to `http://localhost:3000/` and start chatting with QueryBot!

*   Ask **general questions** (e.g., "What is your purpose?").
*   Ask **database-related questions** (e.g., "How many students are there?", "List all employees with their designations.").

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
