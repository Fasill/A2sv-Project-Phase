

# Job Posting UI

This repository contains a React project for displaying job postings with sorting functionality. It uses Next.js, Tailwind CSS, and various components to create a user-friendly interface.

## Features

- **Job Listings**: Display job postings with titles, descriptions, and images.
- **Sorting**: Sort job postings by title.
- **Detailed View**: View detailed information about each job posting, including responsibilities, ideal candidate traits, and job specifics.
- **Authentication**: Secure access with authentication using NextAuth.
- **Data Fetching**: Fetch job postings data from an external API using RTK Query.
- **Bookmark Jobs**: Save job postings by clicking the bookmark icon, and view saved jobs by clicking the "Saved Jobs" button.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Fasill/A2sv-Project-Phase.git
   cd A2sv-Project-Phase/task7
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Data Fetching

This project fetches job postings data from an external API using RTK Query.

The data is fetched from: `https://akil-backend.onrender.com/opportunities`.

## Authentication

Authentication is implemented using NextAuth. It provides secure access to the application and manages user sessions.

## Bookmark Jobs

- **Save Jobs**: Click the bookmark icon on a job posting to save it.
- **View Saved Jobs**: Click the "Saved Jobs" button to see all your saved job postings.

## Project Structure

- `assets/`: Contains icons and other static assets.
- `components/`: Contains reusable React components (`Card`, `CustomButton`).
- `/`: The home page displaying job postings.
- `login/`: Login page for user authentication.
- `signup/`: Signup page for new users.
- `description/`: Page showing detailed information about each job posting.
- `saved/`: Page showing saved job postings.
- `services/`: Contains API service functions for fetching data and handling authentication.

## Dependencies

- React
- Next.js
- Tailwind CSS
- React Icons
- RTK Query
- NextAuth

[Screencast from 08-20-2024 12:46:34 AM.webm](https://github.com/user-attachments/assets/cb62b2fa-af09-40d7-9aaf-0e27ca366c58)

[Screencast from 08-20-2024 12:47:19 AM.webm](https://github.com/user-attachments/assets/87e32d10-f892-48da-89e1-e3fb66f1d916)
