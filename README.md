
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



**Socket.IO Server Initialization:**
- The function checks if a Socket.IO server instance already exists on the HTTP server. If not, it creates a new Server instance from the socket.io library and attaches it to the HTTP server with the path "/api/socketio".

**Client Connections:**
- The function listens for incoming client connections using the connection event of the Socket.IO server.
**Upon a successful connection:**
- A message is logged to the console indicating a user connection. An interval is set to send periodic updates of stock prices to connected clients every 10 seconds.

**Stock Price Updates:**
- The interval functionality reads the "src/data/stocks.json" file containing the stock data. In case of an error reading the file, an error message is logged. If successful, the data is parsed into a JavaScript object representing an array of stocks.

- The stock prices are simulated by generating a random value for each stock and adding a new "time_history" entry with the current timestamp.

- The updated stock data is then emitted to all connected clients using the socket.emit function with the event name "update".

**Client Updates:**
- The function also listens for a "updated" event emitted by clients. This event presumably carries updated stock data from the client-side.
- Upon receiving the "updated" message, the data is converted to a JSON string and written back to the "src/data/stocks.json" file.
- Any errors during the write operation are logged to the console.If successful, a message confirming the file save is logged.
```
/api/socketio.ts
```

**Client listining:**
-  layout component listings for update and updated messages
```
/src/components/layout
```


## State Management

-  used the zustand to manage and update stock prices across the application. zustand is easy to implement with little configuration and its light weight



## SEO and Performance Optimization

### SEO

- Implement proper page titles and meta descriptions for Stock Details pages.

### Performance

- Leverage code-splitting to improve initial load time.
- implemented server-side caching for frequently accessed data.

