import { Contact } from "../models/Contact.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from 'mongoose'


const createContact = asyncHandler(
    async(req,res)=>{
        const { name, email, subject, message } = req.body;
        console.log(req.body);
        if(
            [name, email, subject, message].some((field)=>{
                return field==""
            })
        )
        {
            throw new ApiError(
                402,
                "all fields are required "
            )
        }

        const isUserExist = await Contact.find({email});

        if(
            isUserExist.length > 0
        )
        {
            throw new ApiError(
                402,
                "contact details already exist "
            )
        }

        const newContact = await new Contact({
            name,
            email,
            subject,
            message
        })

        const contact = newContact.save();

        res.status(200)
        .json(
            new ApiResponse(
                200,
                "new contact ",
                contact
            )
        )
    }
)

const getContacts = asyncHandler(
    async(req,res)=>{
        const contacts =  await Contact.find({});
        
        if(
            !contacts
        )
        {
            throw new ApiError(
                402,
                "no contacts found "
            )
        }

        console.log("contacts ", contacts)

        res.status(200)
        .json(
            new ApiResponse(
                200,
                "new contact ",
                contacts
            )
        )
    }
)

const getContactById = asyncHandler(
    async(req,res)=>{
        const { ObjectId } = mongoose.Types; // Import ObjectId from Mongoose

        const { id } = req.params;
        console.log("id:", id, typeof id); // Check the ID type
        
        if (!id) {
            throw new ApiError(402, "ID is required");
        }
        
        // Convert string to ObjectId
        if (!ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid ObjectId format");
        }
        
        const singleContact = await Contact.findById(new ObjectId(id));
        console.log(singleContact);
        
        if(
            !singleContact
        )
        {
            throw new ApiError(
                404,
                "no single contact found "
            )
        }

        console.log(singleContact)

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "single contact ",
                singleContact
            )
        )

    }
)

const updateContact = asyncHandler(
    async(req,res)=>{
        const { id } = req.params;

        if(
            !id
        )
        {
            throw new ApiError(
                402,
                "id is required "
            )
        }


        const updatedContact = await Contact.findByIdAndUpdate(
            {_id:id},
            {
                ...req.body
            },
            {
                new:true
            }
        )

        if(
            !updatedContact
        )
        {
            throw new ApiError(
                404,
                "no updated contact found "
            )
        }

        res.status(200).json(
            new ApiResponse(
                200,
                "updated contacts ",
                updatedContact
            )
        )
    }
)

const deleteContact = asyncHandler(
    async(req,res)=>{
        const { id }= req.params;
        if(
            !id
        )
        {

            throw new ApiError(
                402,
                "id is required "
            )
        }

        const deletedContact = await Contact.findByIdAndDelete(
            {_id:id}
        )

        if(
            !deletedContact 
        )
        {
            throw new ApiError(
                404,
                "no deleted Contact found "
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "deleted Contacts ",
                deletedContact
            )
        )
    }
)

export { createContact, getContacts, getContactById, updateContact, deleteContact };