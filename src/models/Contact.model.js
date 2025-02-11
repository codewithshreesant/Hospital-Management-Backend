
import mongoose,{Schema} from 'mongoose';

const contactSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    subject:{
        type:String
    },
    message:{
        type:String
    }
},
{
    timestamps:true
}
)

export const Contact = mongoose.model('Contact', contactSchema);