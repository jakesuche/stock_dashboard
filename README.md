
# Project Title

A brief description of what this project does and who it's for

### git clone origin 
https://github.com/jakesuche/stock_dashboard.git
# Stock dashboard


This project builds a real-time stock dashboard application using Next.js and WebSockets.

##### Dependency installation
```bash
npm i 
# or
yarn install
```

##### Project Start
```bash
npm run dev
# or
yarn dev
```
##### Folder Structure
```bash
|- pages/
|   |- index.tsx (Home Page)
|   |- [slug].tsx  (Stock Details Page)
|    
|- components/
|   |- PriceChart (Chart Component)
|   |- Layout (Page layout)
|   |- InfoAlert (Simple alert component)
|   |- PriceCard (Price card component for display stock)
|   |- Button (Button component with variouse variant)
|- stores/
|   |- stock.ts 
|- utils/
|   |- stocket.ts (Sock init)
|- data/
|   |- stock.json (list of stock)
|- api/ (Optional - Mock Server)
|   |- stock/[...slug].ts (get price detail)
|-  |- stock  (get all stock)
```


# Stock Market Dashboard with Real-Time Updates

## Initial Setup

### Frontend Framework:
- Next.js

### Mock WebSocket Server:
- We'll use the `socket.io` library

## Page Components

1. **Home Page (Static Site Generation - SSG):**
   - Uses `getStaticProps` to fetch initial stock data from a static JSON file.
   - Displays a list of stock symbols and prices.

2. **Stock Details Page (Server-Side Rendering - SSR):**
   - Fetches the latest stock details (including price) from the server on each request using `getServerSideProps`.
   - Displays stock symbol, current price, and a mock price change graph.

### Get Stock Endpoint
- **URL:** `/api/stocks`
- **Method:** GET
- **Description:** Retrieve available stocks.
- **Response:**
  - Status 200: Returns the details of the requested stock.

### Get Stock Detail Endpoint
- **URL:** `/api/stocks/:slug`
- **Method:** GET
- **Description:** Retrieve detailed information about a specific stock.
- **Parameters:**
  - `slug` (path parameter): The unique identifier of the stock.
- **Response:**
  - Status 200: Returns detailed information about the requested stock.
  - Status 404: If the stock with the provided slug is not found.

### Socket Subscription
- **URL:** `/api/socketio`
- **Overview:** socket subscrition happens on socket routs.
- **Socket Connection:** clients establish subscrition on layout component
- **Socket Events:** Events that clients can subscribe to, and their payloads.

## Real-Time Updates

- The Stock Details page implements a WebSocket connection using the `socket.io` library for both client and server side.
- Upon receiving a price update for a specific stock, the application updates the state and re-renders the component with the new price.

## State Management

-  used the zustand to manage and update stock prices across the application. zustand is easy to implement with little configuration and its light weight

## Next.js App Component (`_app.js`)

- Customizes the `_app.js` file to include:
  - Global styles
  - Next.js Page layout 

#### Next js layout configuration
```python
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}

```

## SEO and Performance Optimization

### SEO

- Implement proper page titles and meta descriptions for Stock Details pages.

### Performance

- Leverage code-splitting to improve initial load time.
- Optimize images for web delivery.
- implemented server-side caching for frequently accessed data.

