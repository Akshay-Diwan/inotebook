const connectToMongo = require('./db') //get the connectToMongo method
const express = require('express')
const cors = require('cors')
connectToMongo();                      //index.js is getting connected to mongodb
const app = express()                 
const port = process.env.PORT || 5000;                     
app.use(express.json())  
app.use(cors());             
//Available Routes
app.use('/api/auth',require('./routes/auth'));
 app.use('/api/notes',require('./routes/notes'));
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})