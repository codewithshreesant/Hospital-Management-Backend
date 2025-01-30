import { Blog } from "../models/Blogs.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBlog = asyncHandler(
    async (req,res)=>{
        const { title, description, image, author, seen, reaction } = req.body;

        if(
            [title, description, image].some((field)=>{
                return field==""
            })
        )
        {
            throw new ApiError(
                402,
                "title, description and image are required ! "
            )
        }

        const newBlog = await Blog({
            title,
            description,
            image,
            author:author ? author : '',
            seen:seen ? seen : '',
            reaction:reaction ? reaction : ''
        })

        const blog = await newBlog.save();

        res.status(200)
        .json(
            new ApiResponse(
                200,
                " Blog created Successfully ",
                blog
            )
        )

    }
)

const getBlogs = asyncHandler(
    async(req,res)=>{
        const blogs = await Blog.find({});
        if(
            !blogs
        )
        {
            throw new ApiError(
                404,
                "no blogs found ! "
            )
        }
        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " blogs ",
                blogs
            )
        )
    }
)

const getBlogById = asyncHandler(
    async (req,res)=>{
        const { id } = req.params;
        if(
            !id
        )
        {
            throw new ApiError(
                402,
                " id is required "
            )
        }

        const singleBlog = await Blog.findById({_id:id});

        if(
            !singleBlog
        )
        {
            throw new ApiError(
                402,
                " no single blog found "
            )
        }
        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " Single Blog ",
                singleBlog
            )
        )
    }
)

const updateBlog = asyncHandler(
    async (req,res)=>{
        console.log("req body update ", req.body);
        const { id } = req.params;
        console.log(id);
        if(
            !id
        )
        {
            throw new ApiError(
                402,
                "id id required"
            )
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                ...req.body
            },
            {
                new:true,
                runValidators: true
            }
        )
        
        if(
            !updatedBlog  
        )
        {
            throw new ApiError(
                404,
                "no updated blog found ! "
            )
        }
        
        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " updated blogs ",
                updatedBlog 
            )
        )
    }
)

const deleteBlog = asyncHandler(
    async (req,res)=>{
        const { id } = req.params;
        if(
            !id
        )
        {
            throw new ApiError(
                402,
                "id id required"
            )
        }

        const deletedBlog = await Blog.findByIdAndDelete(
            {_id:id}
        )

        if(
            !deletedBlog
        )
        {
            throw new ApiError(
                404,

                "no deleted blog found"
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " delete blog ",
                deletedBlog
            )
        )
    }
)

const getRecentBlogs = asyncHandler(
    async (req,res) => {
        const recentBlogs = await Blog.find({});

        if(
            !recentBlogs 
        )
        {
            throw new ApiError(
                404,
                "no blogs found ! "
            )
        }

        let recent;
        if(recentBlogs.length >= 5)
        {
            recent = recentBlogs.slice(recentBlogs.length-3 ,recentBlogs.length)
        }else if(recentBlogs.length < 5 && recentBlogs.length !== 1){
            recent = recentBlogs.slice(recentBlogs.length-2 ,recentBlogs.length)
        }else{
            recent = recentBlogs;
        }
                    
        res.status(200)
        .json(
            new ApiResponse(
                200,
                " Recent Blogs ",
                recent
            )
        )
    }
)


export { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, getRecentBlogs };

