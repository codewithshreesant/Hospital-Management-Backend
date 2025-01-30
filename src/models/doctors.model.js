
import mongoose,{Schema} from 'mongoose';

const doctorSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    }
},
{
    timestamps:true
}
)

export const Doctor = mongoose.model('Doctor', doctorSchema);

