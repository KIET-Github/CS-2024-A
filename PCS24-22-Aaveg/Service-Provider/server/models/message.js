const mongoose=require('mongoose');

const Message = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Provider'
    },
    message:[{
            sender:{
                type:Number,
                default:0
            },
            content:{
                type:String,
            }
        }
    ],
    latest:{
        type:String,
        default:"Say Hi!"
    },
    puser:{
        type:Number,
        default:0
    },
    pprovider:{
        type:Number,
        default:0
    }
});


const hostPerson = mongoose.model('Message', Message);

module.exports =hostPerson;
