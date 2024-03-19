This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.



This project builds a real-time stock dashboard application using Next.js and WebSockets.

1. Initial Setup:

Frontend framework: Next.js
Mock WebSocket server: We'll use the ws library
2. Page Components:

Home page (SSG):
Uses getStaticProps to fetch initial stock data from a static JSON file.
Displays a list of stock symbols and prices.
Stock Details page (SSR):
Fetches the latest stock details (including price) from the server on each request using getServerSideProps.
Displays stock symbol, current price, and a mock price change graph.
3. Real-time Updates:

Stock Details page implements a WebSocket connection using the ws library.
Upon receiving a price update for a specific stock, the application updates the state and re-renders the component with the new price.
4. State Management:

We'll use the Context API to manage and update stock prices across the application.
5. Next.js App Component (_app.js):

Customizes the _app.js file to include:
Global styles
Context provider for stock data
SEO and Performance Optimization:

SEO:
Implement proper page titles and meta descriptions for Stock Details pages.
Consider using Next.js's built-in support for dynamic route generation.
Performance:
Leverage code-splitting to improve initial load time.
Optimize images for web delivery.
Consider implementing server-side caching for frequently accessed data.
Deliverables:

A GitHub repository link containing the complete project code will be provided upon request (due to privacy concerns).

README.md Documentation:

The README.md will explain:

Setup and Run:
Project dependencies installation instructions.
Development server start command.
State Management:
Explanation of using Context API for state management and its benefits.
Real-time Updates:
How the ws library establishes a WebSocket connection and updates the UI.
Assumptions:
Details about the mock data format and assumptions made.
SEO and Performance:
Implemented SEO practices and performance optimizations.
Please note: This is a high-level overview of the project. The actual implementation will involve writing code for various functionalities like fetching data, connecting to WebSockets, and managing state using Context API.

Feel free to ask if you have any further questions about specific parts of the implementation!

|- pages/
|   |- index.js (Home Page)
|   |- stocks/
|       |- [symbol].js (Stock Details Page)
|- components/
|   |- PriceChart.js (Chart Component)
|- context/
|   |- StockContext.js (State Management - Optional)
|- api/ (Optional - Mock Server)
|   |- stock/[symbol].js
