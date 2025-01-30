
import mongoose,{Schema} from 'mongoose';

const newsSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description:{
        type:String,
        requied:true,
    },
    image:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        default:'Admin',
    },
    seen:{
        type:Number
    },
    reaction:{
        type:Number
    },
},
{
    timestamps:true 
}
)

export const News  = mongoose.model('News',newsSchema);

