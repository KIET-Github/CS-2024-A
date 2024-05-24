const mongoose=require('mongoose');

const conn=mongoose.connect(process.env.ATLAS_URI)
    .then(db=>{
        console.log("Database Connected");
        return db;
    }).catch(err=>{
        console.log("connection error");
    })

module.exports=conn;    