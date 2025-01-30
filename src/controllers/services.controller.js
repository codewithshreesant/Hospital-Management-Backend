import { Service } from "../models/services.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createService = asyncHandler(
    async(req,res)=>{
        const {title,description,img} = req.body;

        if(
            [
                title,
                description,
                img
            ].some((field)=>{
                return field == ""
            })
        )
        {
            throw new ApiError(400,"All fields are required");
        }

        const service = new Service({
            title,
            description,
            img
        });

        const services = await service.save();

        res.status(201).json(
            new ApiResponse(201,"Service created successfully",services)
        )
    }
)

const getServices = asyncHandler(
    async(req,res)=>{
        const services = await Service.find();

        if(!services)
        {
            throw new ApiError(404,"No services found");
        }

        res.status(200).json(
            new ApiResponse(200,"Services fetched successfully",services)
        )
    }
)

const getServiceById = asyncHandler(
    async(req,res)=>{
        const service = await Service.findById(req.params.id);

        if(!service)
        {
            throw new ApiError(404,"Service not found");
        }

        res.status(200).json(
            new ApiResponse(200,"Service fetched successfully",service)
        )
    }
)


const updateService = asyncHandler(
    async(req,res)=>{
        const service = await Service.findById(req.params.id);

        if(!service)
        {
            throw new ApiError(404,"Service not found");
        }

        const {title,description,image} = req.body;

        if(
            [
                title,
                description,
                image
            ].some((field)=>{
                return field == ""
            })
        )
        {
            throw new ApiError(400,"All fields are required");
        }

        service.title = title;
        service.description = description;
        service.image = image;

        const updatedService = await service.save();

        res.status(200).json(
            new ApiResponse(200,"Service updated successfully",updatedService)
        )
    }
)


const deleteService = asyncHandler(
    async(req,res)=>{
        const service = await Service.findByIdAndDelete(req.params.id);

        if(!service)
        {
            throw new ApiError(404,"Service not found");
        }

        // await service.remove();

        res.status(200).json(
            new ApiResponse(200,"Service deleted successfully",service)
        )
    }
)

export {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
}