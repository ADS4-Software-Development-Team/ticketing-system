# IT Support Ticketing System (DekagoTicketFlow)

A full-stack web application designed to streamline IT support operations. It allows office personnel to submit and track IT support tickets, provides a dashboard for support agents to manage and resolve these tickets, and includes a comprehensive admin panel for user management and system analytics.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Scripts](#scripts)

## Features

### 👤 User (Office Personnel)
- **Authentication**: Secure user registration and login.
- **Dashboard**: A personal dashboard displaying statistics of their tickets (New, Open, In Progress, Resolved).
- **Ticket Creation**: Submit new support tickets with details like subject, category, description, and priority.
- **Ticket Management**: View a list of all submitted tickets.
- **Filtering & Sorting**: Filter tickets by status and sort them by creation date or priority.
- **View Details**: Open a modal to see ticket details, including conversation history.

### 🛠️ Support Agent
- **Agent Dashboard**: A dedicated dashboard with an overview of total, open, in-progress, and resolved tickets.
- **Ticket Queues**: View active and resolved tickets in separate lists.
- **Ticket Interaction**: Click on a ticket to view its full details, including the issue description and user information.
- **Status Updates**: Change the status of a ticket (e.g., from 'Open' to 'In Progress').
- **Communication**: Reply to tickets to communicate with the user (UI implemented).

### 👑 Administrator
- **Admin Panel**: A comprehensive dashboard with system-wide statistics and analytics.
- **User Management**: Add, view, edit, activate/deactivate, and delete user and agent accounts.
- **Ticket Oversight**: View a list of all tickets created in the system.
- **Analytics**: Visualize ticket data with charts, showing breakdowns by status and category.
- **Quick Actions**: Easily navigate to user management or add a new agent directly from the dashboard.

## Tech Stack

### Frontend
- **Framework**: React.js
- **Routing**: React Router
- **HTTP Client**: Axios
- **Styling**: CSS with class-based design patterns (resembling utility-first principles).
- **Charts**: Recharts (for admin analytics)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt.js

## Project Structure

The project is a monorepo with two main directories:

- `frontend/`: Contains the React.js application for the user interface.
- `backend/`: Contains the Node.js/Express.js server for the API and business logic.

## Prerequisites

- Node.js (v18.x or later recommended)
- npm (comes with Node.js)
- A Supabase account for the database and backend services.

## Installation and Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/ADS4-Software-Development-Team/ticketing-system.git
    cd ticketing-system
    ```

2.  **Set up Supabase**
    - Go to supabase.com and create a new project.
    - In your Supabase project, navigate to the **SQL Editor**.
    - Create new queries to set up your database schema (e.g., for `users`, `tickets`, `conversations`). You will need to create the table structure manually.
    - Go to **Project Settings** > **API**.
    - Find your **Project URL** and **anon (public) key**. You will need these for the backend configuration.

3.  **Configure Backend Environment**
    - Navigate to the `backend` directory: `cd backend`
    - Create a `.env` file: `touch .env`
    - Add your Supabase credentials to the `.env` file:
      ```env
      SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
      SUPABASE_KEY=YOUR_SUPABASE_ANON_KEY
      JWT_SECRET=your_super_secret_jwt_key_here
      ```

4.  **Install Dependencies**
    - From the root directory of the project, run the `install-all` script. This will install dependencies for both the root, backend, and frontend.
    ```bash
    npm run install-all
    ```

5.  **Run the Application**
    - From the root directory, run the development script. This will start both the frontend and backend servers concurrently.
    ```bash
    npm run dev
    ```
    - The frontend will be available at `http://localhost:3000`.
    - The backend API will be running on `http://localhost:5000`.

## Usage

- **Admin**: The first user you create in your `users` table should have the `role` set to `admin`. Use these credentials to log in.
- **Office Personnel**: New users can register directly from the login page by clicking "Create Account".
- **Support Agent**: Agents cannot self-register. An administrator must create an agent account from the "User Management" section of the admin dashboard.

## Default Login Credentials

For demonstration and testing purposes, you can create and use the following accounts.

*   **Administrator**
    *   **Email**: `admin@dekago.com`
    *   **Password**: `admin12`
*   **Support Agent**
    *   **Email**: `agent1@gmail.com`
    *   **Password**: `agent12`
*   **User (Office Personnel)**
    *   **Email**: `ayanda@gmail.com`
    *   **Password**: `ayanda12`

## Deployment

The application is deployed on Render and is publicly accessible.

**Live Application URL:** https://ticketing-system-frontend-edag.onrender.com

## Scripts

The following scripts are available in the root `package.json`:

- `npm run install-all`: Installs all dependencies for the entire project.
- `npm run dev:backend`: Starts the backend server in development mode.
- `npm run dev:frontend`: Starts the frontend React development server.
- `npm run dev`: Runs both `dev:backend` and `dev:frontend` concurrently.
- `npm run build`: Creates a production build of the frontend application.