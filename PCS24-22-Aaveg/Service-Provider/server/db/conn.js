const  mongoose= require('mongoose');
const DB= process.env.DB;

mongoose.connect(DB).then(()=>{
  console.log(`DB connected`);
}).catch((err)=>{
  // console.log("Error");
  console.log(err);
})