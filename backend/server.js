
////////////////////////////////////////////////////// Backend ////////////////////////////////////////////////////
// here we created server and on this server we're hosting 

const http=require('http');
const server= http.createServer();
const PORT = 5000;
const app= require('./app');


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





