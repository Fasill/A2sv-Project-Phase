
# Job Posting UI

This repository contains a React project for displaying job postings with sorting functionality. It uses Next.js, Tailwind CSS, and various components to create a user-friendly interface.

## Features

- **Job Listings**: Display job postings with titles, descriptions, and images.
- **Sorting**: Sort job postings by title.
- **Detailed View**: View detailed information about each job posting, including responsibilities, ideal candidate traits, and job specifics.
- **Data Fetching**: Fetch job postings data from an external API.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Fasill/A2sv-Project-Phase.git
   cd A2sv-Project-Phase/task6
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

This project fetches job postings data from an external API using RTK Redux.

The data is fetched from: `https://akil-backend.onrender.com/opportunities`.

## Project Structure

- `assets/`: Contains icons and other static assets.
- `components/`: Contains reusable React components (`Card`, `CustomButton`).
- `pages/`: Contains the main pages (`Home`, `Description`).
- `services/`: Contains API service functions for fetching data.

## Dependencies

- React
- Next.js
- Tailwind CSS
- React Icons
- RTK Redux

---
