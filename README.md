# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🐍 Django backend (REST API)
- 📖 [React Router docs](https://reactrouter.com/)


## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000` or where the cmd states.

# Backend Setup (Django REST API):

## Navigate to the backend folder
cd src/backend

## Create and activate a virtual environment
python -m venv .venv

.venv\Scripts\activate.bat 

## Create a .env file in project root directory with:
VITE_API_URL=http://127.0.0.1:8000
## Install Django and dependencies
pip install django djangorestframework

pip install django-cors-headers

## Apply migrations and create admin user
python manage.py makemigrations &nbsp

python manage.py migrate &nbsp

python manage.py createsuperuser

## Run the backend server
python manage.py runserver

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fremix-run%2Freact-router-templates%2Ftree%2Fmain%2Fvercel&project-name=my-react-router-app&repository-name=my-react-router-app)

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.


