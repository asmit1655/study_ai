import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext';

import LoginPage from './components/Login.jsx';
import RegisterPage from './components/Register.jsx';
import DashboardPage from './components/Dashboard.jsx';
import QuizPage from './components/Quiz.jsx';
import FlashcardPage from './components/FlashCard.jsx';
import AssistantPage from './components/Chat_assistant.jsx';
import ProtectedRoute from './components/ProtectecRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The main layout component, includes the landing page
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    // This is the protected route group for the dashboard
    path: '/dashboard',
    element: <ProtectedRoute />, // The wrapper that checks for authentication
    children: [
      // These routes can only be accessed if the user is logged in
      {
        path: '', // The base /dashboard route
        element: <DashboardPage />,
      },
      {
        path: 'quiz', // /dashboard/quiz
        element: <QuizPage />,
      },
      {
        path: 'flashcards', // /dashboard/flashcards
        element: <FlashcardPage />,
      },
      {
        path: 'assistant', // /dashboard/assistant
        element: <AssistantPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
