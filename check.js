let check = [
  {
    time_histories: [
      {
        price: "999.74",
        timestamp: "2024-03-19T14:32:48.101Z",
      },
      {
        price: "729.11",
        timestamp: "2024-03-19T14:34:47.917Z",
      },
      {
        price: "57.92",
        timestamp: "2024-03-19T14:37:44.349Z",
      },
      {
        price: "41.82",
        timestamp: "2024-03-19T14:40:21.730Z",
      },
    ],
  },
];

setInterval(() => {
  const updatedStock = check.map((item) => ({
    ...item,
    time_histories:[...item.time_histories.slice(0,5),{timestamp:new Date(),price:item.price} ],
    price: (Math.random() * 1000).toFixed(2),
  }));
  check = updatedStock;
  console.log(JSON.stringify(check, null, 2));

}, 2000);


