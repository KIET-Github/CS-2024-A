const mongoose=require('mongoose');

const Schema=mongoose.Schema;

//categories=>field=>['language','color']
const categories_model=new Schema({
    language:{type:String,default:"C++"},
    color:{type:String,default:'#FCBE44'}
})

//Feedback=>field=>['name','feed','current','future','date']
const feedback_model=new Schema({
    name:{type:String,default:"a"},
    feed:{type:String,default:'a'},
    language:{type:String,default:'JAVA'},
    future:{type:String,default:'a'},
    add:{type:Number,default:1},
    date:{type:Date,default:Date.now}
})

const Categories=mongoose.model("categories",categories_model)
const Feedback=mongoose.model("feedback",feedback_model)

exports.default=Feedback;
module.exports={
    Categories,
    Feedback
}