
import mongoose,{Schema} from 'mongoose';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    verifyToken:String,
    verifyTokenExpiry:Date,
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date
},{
    timestamps:true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});


userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id, role:this.isAdmin},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    });
}

export const User = mongoose.model('User', userSchema);