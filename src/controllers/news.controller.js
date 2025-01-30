import { News } from "../models/news.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNews = asyncHandler(
    async(req, res)=>{
        const {title, description, seen, reaction, image, author} = req.body;

        if(
            [title, description, seen, reaction, image, author].some((field)=>{
                return field == ""
            })
        )
        {
            throw new ApiError(400, "All fields are required");
        }

        const newNews = new News({
            title,
            description,
            seen,
            reaction,
            image,
            author
        })

        const news = await newNews.save();

        res.status(200).json(
            new ApiResponse(
                200,
                "News created successfully",
                news
            )
        )
    }
)

const getNews = asyncHandler(
    async(req, res)=>{
        const news = await News.find();

        if(
            !news
        )
        {
            throw new ApiError(404, "No news found");
        }

        res.status(200).json(
            new ApiResponse(
                200,
                "All news",
                news
            )
        )
    }
)

const getNewsById = asyncHandler(
    async(req,res)=>{
        const news = await News.findById(req.params.id);

        if(
            !news
        )
        {
            throw new ApiError(404, "News not found");
        }

        res.status(200).json(
            new ApiResponse(
                200,
                "News found",
                news
            )
        )
    }
)

const updateNews = asyncHandler(
    async(req,res)=>{

        const news = await News.findById(req.params.id);

        if(
            !news
        )
        {
            throw new ApiError(404, "News not found");
        }

        const {title, description, seen, reaction, image, author} = req.body;

        if(
            [title, description, seen, reaction, image, author].some((field)=>{
                return field == ""
            })
        )
        {
            throw new ApiError(400, "All fields are required");
        }

        news.title = title;
        news.description = description;
        news.seen = seen;
        news.reaction = reaction;
        news.image = image;
        news.author = author;

        const updatedNews = await news.save();

        res.status(200).json(
            new ApiResponse(
                200,
                "News updated successfully",
                updatedNews
            )
        )
    }
)

const deleteNews = asyncHandler(
    async(req,res)=>{
        const news = await News.findByIdAndDelete(req.params.id);

        if(
            !news
        )
        {
            throw new ApiError(404, "News not found");
        }

        // await news.remove();

        res.status(200).json(
            new ApiResponse(
                200,
                "News deleted successfully",
                news
            )
        )
    }
)


export {
    createNews,
    getNews,
    getNewsById,
    updateNews,
    deleteNews
}