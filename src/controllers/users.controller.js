import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = async (id) => {
    const user = await User.findById({_id:id});

    if(!user){
        throw new ApiError(404,"User not found");
    }

    user.isVerified = true;

    await user.save({validateBeforeSave:false});

    const token = user.getSignedToken();

    return {token};
}

const createUser = asyncHandler(
    async(req,res)=>{
        const {username,email,password}=req.body;

        if(
            [username, email, password].some((field)=>{
                return field==""
            })
        )
        {
            throw new ApiError(400,"Please fill all fields");
        }

        const isExistedUser = await User.findOne({email});

        if(isExistedUser){
            throw new ApiError(400,"User already existed");
        }

        const user = new User({
            username,
            email,
            password
        });

        const users = await user.save();

        res.status(201).json(
            new ApiResponse(201,"User created",users)
        );
    }
)

const getUsers = asyncHandler(
    async(req,res)=>{
        const users = await User.find();

        if(!users){
            throw new ApiError(404,"No users found");
        }

        res.status(200).json(
            new ApiResponse(200,"Users fetched",users)
        );
    }
)

const LoginUser = asyncHandler(
    async(req,res)=>{
        const {email,password}=req.body;

        if(
            [email, password].some((field)=>{
                return field==""
            })
        )
        {
            throw new ApiError(400,"Please fill all fields");
        }

        const user = await User.findOne({email});

        if(!user){
            throw new ApiError(404,"User not found");
        }

        if(!user.matchPassword(password)){
            throw new ApiError(401,"Invalid credentials");
        }

        const {token}=await generateToken(user._id);

        res.cookie("token",token,{
            expires: new Date(Date.now() + 1000*60*60*24*30),
            httpOnly:true
        });

        const users = await User.findOne({_id:user._id});

        users.isLoggedIn=true;
        await users.save({ validateBeforeSave: false });


        res.status(200).json(
            new ApiResponse(200,"User logged in",user)
        );
    }
)

const logoutUser = asyncHandler(
    async(req,res)=>{
        // res.cookie("token","none",{
        //     expires: new Date(Date.now() + 1000),
        //     httpOnly:true
        // });

        const id = req.user.id;

        const users = await User.findOne({_id:id});

        users.isLoggedIn=false;
        await users.save({ validateBeforeSave: false });

        res.clearCookie("token");



        res.status(200).json(
            new ApiResponse(200,"User logged out",{})
        );
    }
)



export {createUser, getUsers, LoginUser, logoutUser};