# Whatcha Doin?

A simple, real-time status-sharing application. This project is built using a modern web stack, featuring Vite for the build tooling, React and TypeScript for the frontend, and Supabase for the backend.

## ✨ Features

- **Real-time Updates**: See status changes instantly thanks to Supabase's real-time capabilities.
- **Modern UI**: Clean and responsive interface built with Tailwind CSS.
- **Type-Safe**: Fully written in TypeScript for better developer experience and fewer bugs.
- **Fast Development**: Vite provides a lightning-fast development server and optimized builds.

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [Supabase](https://supabase.com/) (Database, Auth, Real-time)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Utilities**:
  - `clsx` & `tailwind-merge` for conditional class names.
  - `tailwindcss-animate` for simple animations.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or another package manager (yarn, pnpm)
- A Supabase account and project.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd whatcha-doin
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```

    Now, open the `.env` file and add your Supabase project URL and anon key. You can find these in your Supabase project's "API" settings.

    ```env
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application should now be running on `http://localhost:5173`.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the source code using ESLint to find and fix problems.
