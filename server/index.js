const express= require('express');
const app = express();

const cors = require('cors');
const cookieParser=require('cookie-parser')
require('dotenv').config();

// /**Database connection */
require('./db/conn');



// /**middleware */
app.use(cors());
app.use(cookieParser())
app.use(express.json());

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
// }); 

app.get('/', (req, res) => {
    res.status(200).json("Home GET Request");
});

const client=require('./routes/client');
const provider=require('./routes/provider');

app.use('/api/client',client);
app.use('/api/provider',provider);

const port = process.env.PORT;

const server=app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});


const io=require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:"*",
  }
})

io.on('connection',(socket)=>{
  console.log('a user connected');

  socket.on('setup',(id)=>{
    console.log(`connected ${id}`)
    socket.join(id);
  })

  // socket.on('create',(data)=>{
  //   socket.to(data.provider).emit('createUser',data);
  // })

  socket.on('send',(data)=>{
    console.log("data");
    console.log(data);
    socket.to(data.id).emit('recieved',data);
  })

  socket.on('disconnect',()=>{
    socket.leaveAll();
    console.log('user disconnect')
  })
})