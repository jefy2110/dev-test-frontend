# Frontend for Hotel SPA Test

This is a [Next.js](https://nextjs.org) project, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). 

I decided to complete both the frontend and backend tests, even though the instructions required only one. The frontend and backend are implemented in separate repositories and are connected to work seamlessly together. To ensure flexibility during testing, I implemented a failsafe mechanism in the frontend that uses dummy data if the backend is not running. This allows the frontend to function independently without requiring the backend to be active.

**Note:** 

The image URLs provided in the test data point to `example.com`, which does not host the actual images. As a fallback, placeholder images are used to maintain the UI.

The "datesOfTravel" value in the hotel objects purpose was abit unclear. As usually this would entail the dates a user selected to travel however each hotel had different dates, and as I understand this test does not expect more then list of hotels and hotel details I do not believe it was intended for me to include a dates selector component that would then filter for hotels based on what is available. So I have simply left it as a detail on the card.

Contexts were not used as I saw no need. All state variables were self contained in their respective files.

## Features

- Displays a list of hotels with detailed information.
- Failsafe mechanism to load dummy data when the backend is unavailable.
- Individual hotel detail pages with styled layouts.
- Fully responsive design using modern CSS techniques.
- Rerouting from undefined routes back to /hotels

## Getting Started

To set up and run the project, follow these steps:

### 1.  Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Run the following command in the project root:

```bash
npm install
```

### 3. Build the Project

Build the project for production:

```bash
npm run build
```
### 4. Start the Project

Start the production server:

```bash
npm start
```

### 5. Access the Application

Open [http://localhost:3000] in your browser to view the application.

## Project Structure

- **`app/`**: Contains Next.js pages.
- **`components/`**: Contains custom reusable react components.
- **`helpers/`**: Contains api script for connecting to backend api endpoints.
- **`types/`**: Contains all types used across project.
- **`data/`**: Includes `hotels.json` for dummy data used as a failsafe.
- **`styles/`**: Contains CSS files for styling.

## Failsafe Details

If the backend is unavailable, the frontend automatically falls back to `src/data/hotels.json` to ensure the application remains functional.
Any undefined routes will be redirect back to /hotels

## Testing Notes

- **Backend:** If you want to test the full integration, ensure the backend is running. backend can be found in a seperate public repository called dev-test-backend
- **Frontend:** The frontend will function with or without the backend, thanks to the failsafe.


