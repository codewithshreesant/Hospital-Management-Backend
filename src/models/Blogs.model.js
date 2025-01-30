
import mongoose,{Schema} from 'mongoose'

const blogsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    author:{
        type:String,
        default:'Admin'
    },
    seen:{
        type:Number 
    },
    reaction:{
        type:Number  
    }
},
{
    timestamps:true 
}
)

export const Blog = mongoose.model( 'Blog', blogsSchema );
