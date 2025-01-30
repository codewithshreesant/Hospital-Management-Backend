
import mongoose,{Schema} from 'mongoose';

const serviceSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    }
},
{
    timestamps:true
}
);

export const Service  = mongoose.model('Service',serviceSchema);