import mongoose from 'mongoose'

const { Schema } = mongoose;

const sessioinSchema=new Schema({
    token:{type:String}
})

export default mongoose.model('Session',sessioinSchema);