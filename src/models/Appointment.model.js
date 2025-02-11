
import mongoose,{Schema} from 'mongoose'

const appointmentSchema = new Schema({
    name:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:Date
    },
    time:{
        type:Date
    },
    doctor:{
        type:String,
        required:true
    },
    department:{
        type:String,
    },
    message:{
        type:String
    }
},
{
    timestamps:true
}
)

export const Appointment = mongoose.model('Appointment', appointmentSchema); 