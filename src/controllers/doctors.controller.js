import { Doctor } from "../models/doctors.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createDoctor = asyncHandler(
    async (req,res)=>{
        const {name, category, img, email} = req.body;

        if(
            [name, category, img, email].some((field)=>{
                return field == ""
            })
        )
        {
            throw new ApiError(
                400,
                "All fields are required"
            )
        }

        const isExistedDoctor = await Doctor.findOne({email});
        if(isExistedDoctor){
            throw new ApiError(
                400,
                "Doctor already exists"
            )
        }

        const newDoctor = new Doctor({
            name,
            email,
            category,
            img
        })

        const doctors = await newDoctor.save();

        res.status(200).json(
            new ApiResponse(
                200,
                "Doctor created successfully",
                doctors
            )
        )
    }
)

const getDoctors = asyncHandler(
    async (req,res)=>{

        const doctors = await Doctor.find({});

        if(!doctors)
        {
            throw new ApiError(
                404,
                "No doctors found"
            )
        }
        
        res.status(200).json(
            new ApiResponse(
                200,
                doctors
            )
        )   
    }
)

const getDoctorById = asyncHandler( 
    async (req,res)=>{
        const doctor = await Doctor.findById(req.params.id);

        if(!doctor)
        {
            throw new ApiError(
                404,
                "Doctor not found"
            )
        }

        res.status(200).json(
            new ApiResponse(
                200,
                doctor
            )
        )
    }
)

const updateDoctor = asyncHandler(
    async (req,res)=>{
        const {name, category, img, email} = req.body;

        if(
            [name, category, img, email].some((field)=>{
                return field==""
            })
        )
        {
            throw new ApiError(
                400,
                "All fields are required"
            )
        }

        const doctor = await Doctor.findByIdAndUpdate(
            {_id:req.params.id},
            {
                name,
                category,
                img,
                email
            },
            {new:true}
        )

        if(!doctor)
        {
            throw new ApiError(
                404,
                "Doctor not found"
            )
        }

        res.status(200).json(
            new ApiResponse(
                200,
                "Doctor updated successfully",
                doctor
            )
        )
    }
)

const deleteDoctor = asyncHandler(
    async (req,res)=>{
        const doctor = await Doctor.findByIdAndDelete(req.params.id);

        if(!doctor)
        {
            throw new ApiError(
                404,
                "Doctor not found"
            )
        }

        res.status(200).json(
            new ApiResponse(
                200,
                "Doctor deleted successfully"
            )
        )
    }
)

export {createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor};