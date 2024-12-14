// Third party file 
const app = require('./app');
const DataBaseConnection = require('./config/db');


//port initialize 
const PORT = process.env.PORT || 5000;

//mode initialize
const NODE_ENV = process.env.NODE_ENV;


//database connection
DataBaseConnection();

// listen port for server
app.listen(PORT,()=>{
    console.log(`Server Running Port: ${PORT} on ${NODE_ENV} mode.`);
});