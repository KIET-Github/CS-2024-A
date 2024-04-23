const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    fname: { 
        type: String,
        require:true
    },
    lname: { 
        type: String,
        require:true
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    mobile : { 
        type : Number,
        require:true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    tokens:[{
        token:{
            type: String,
            required: true  
        }
    }]
});

UserSchema.methods.generateToken= async function(){
    try{
        const token= jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens= this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log("Error while generating token");
        console.error(err);
    }
}
UserSchema.pre('save',async function (next){
    if(this.isModified("password")){
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
    }
     next(); 
})

UserSchema.methods.matchPassword=async function(password){
    const data=await bcrypt.compare(password,this.password)
    return data;
}

const hostPerson = mongoose.model('User', UserSchema);

module.exports = hostPerson;
