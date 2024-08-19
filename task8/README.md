# Job Posting UI

This repository contains a React project for displaying job postings with sorting functionality. It uses Next.js, Tailwind CSS, and various components to create a user-friendly interface.

## Features

- **Job Listings**: Display job postings with titles, descriptions, and images.
- **Sorting**: Sort job postings by title.
- **Detailed View**: View detailed information about each job posting, including responsibilities, ideal candidate traits, and job specifics.
- **Authentication**: Secure access with authentication using NextAuth.
- **Data Fetching**: Fetch job postings data from an external API using RTK Query.

## Installation

1. Clone the repository:
   
bash
   git clone https://github.com/Fasill/A2sv-Project-Phase.git
   cd A2sv-Project-Phase/task7


2. Install dependencies:
   
bash
   npm install


## Usage

1. Start the development server:
   
bash
   npm run dev


2. Open your browser and navigate to http://localhost:3000.

## Data Fetching

This project fetches job postings data from an external API using RTK Query.

The data is fetched from: https://akil-backend.onrender.com/opportunities.

## Authentication

Authentication is implemented using NextAuth. It provides secure access to the application and manages user sessions.

## Project Structure

- assets/: Contains icons and other static assets.
- components/: Contains reusable React components (Card, CustomButton).

- /: The home page displaying job postings.
- login/: Login page for user authentication.
- signup/: Signup page for new users.
- description/: Page showing detailed information about each job posting.
- services/: Contains API service functions for fetching data and handling authentication.

## Dependencies

- React
- Next.js
- Tailwind CSS
- React Icons
- RTK Query
- NextAuth

[Screencast from 08-07-2024 03:47:05 PM.webm](https://github.com/user-attachments/assets/f7971d39-bdff-476d-8410-7a2799a5dc10)

[Screencast from 08-07-2024 03:47:51 PM.webm](https://github.com/user-attachments/assets/16176688-c073-40d7-baf6-8675b099acb4)

[Screencast from 08-07-2024 03:49:50 PM.webm](https://github.com/user-attachments/assets/728e85ff-5871-4a68-840a-1883d33025ab)
