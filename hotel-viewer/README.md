# Frontend for Hotel SPA Test

This is a [Next.js](https://nextjs.org) project, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). 

I decided to complete both the frontend and backend tests, even though the instructions required only one. The frontend and backend are implemented in separate repositories and are connected to work seamlessly together. To ensure flexibility during testing, I implemented a failsafe mechanism in the frontend that uses dummy data if the backend is not running. This allows the frontend to function independently without requiring the backend to be active.

**Note:** The image URLs provided in the test data point to `example.com`, which does not host the actual images. As a fallback, placeholder images are used to maintain the UI.

## Features

- Displays a list of hotels with detailed information.
- Failsafe mechanism to load dummy data when the backend is unavailable.
- Individual hotel detail pages with styled layouts.
- Fully responsive design using modern CSS techniques.

## Getting Started

To set up and run the project, follow these steps:

### Install Dependencies

Run the following command in the project root:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Build the Project

Build the project for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start the Project

Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

### Access the Application

Open [http://localhost:3000] in your browser to view the application.

## Project Structure

- **`app/`**: Contains Next.js pages.
- **`src/data/`**: Includes `hotels.json` for dummy data used as a failsafe.
- **`styles/`**: Contains CSS files for styling.

## Failsafe Details

If the backend is unavailable, the frontend automatically falls back to `src/data/hotels.json` to ensure the application remains functional.

## Testing Notes

- **Backend:** If you want to test the full integration, ensure the backend is running.
- **Frontend:** The frontend will function with or without the backend, thanks to the failsafe.


