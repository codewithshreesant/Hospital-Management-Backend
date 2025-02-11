import moment from 'moment';
import { Appointment } from "../models/Appointment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAppointment = asyncHandler(
    async (req, res) => {
        const { name, email, date, time, doctor, department, message } = req.body;

        if (
            [name, email, date, time, doctor, department, message].some((field) => {
                return field == ""
            })
        ) {
            throw new ApiError(402, "All fields are required ");
        }

        const appointmentDate = moment(date, 'YYY-MM-DD', true);
        const appointmentTime = moment(time, 'HH:mm', true);

        if (!appointmentDate.isValid() || !appointmentTime.isValid()) {
            throw new ApiError(403, "Invalid Date or Time")
        }

        const isUserExist = await Appointment.find({ email });

        if (isUserExist.length > 0) {
            throw new ApiError(
                401,
                "User Details already Exist "
            )
        }

        const newAppointment = await new Appointment({
            name,
            email,
            date: appointmentDate,
            time: appointmentTime,
            doctor,
            department,
            message
        })

        const appointment = await newAppointment.save();

        res.status(200).json(
            new ApiResponse(
                200,
                "Appointment created successfully ",
                appointment
            )
        )

    }
)

const getAppointments = asyncHandler(
    async (req, res) => {
        const appointments = await Appointment.find({});
        if (
            !appointments
        ) {
            throw new ApiError(
                404,
                "no appointments found "
            )
        }

        res.status(200)
            .json(
                new ApiResponse(
                    200,
                    "Appointments ",
                    appointments
                )
            )

    }
)

const getAppointmentById = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const singleAppointment = await Appointment.findById({ _id: id });
        if (
            !singleAppointment
        ) {
            throw new ApiError(
                404,
                "no single appointment found "
            )
        }

        res.status(200)
            .json(
                new ApiResponse(
                    200,
                    "single appointment ",
                    singleAppointment
                )
            )

    }
)

const updateAppointment = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        console.log("req body of update appointment ", req.body)
        const { name, email, date, time, doctor, department, message } = req.body;

        if (
            [name, email, date, time, doctor, department, message].some((field) => {
                return field == ""
            })
        ) {
            throw new ApiError(402, "All fields are required ");
        }

        let appointmentDate;
        let appointmentTime;
        if (date && time) {
            appointmentDate = moment(date, 'YYY-MM-DD', true);
            appointmentTime = moment(time, 'HH:mm', true);
        }

        if (
            !id
        ) {
            throw new ApiError(
                404,
                "id is required "
            )
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            { _id: id },
            {
                name,
                email,
                date: date ? appointmentDate : "",
                time: time ? appointmentTime : "",
                doctor,
                department,
                message
            },
            {
                new: true
            }
        )

        console.log("Updated Appointment ", updatedAppointment)

        if (
            !updatedAppointment
        ) {
            throw new ApiError(
                404,
                "no updated appointment found "
            )
        }

        res.status(200)
            .json(
                new ApiResponse(
                    200,
                    "updated appointment ",
                    updatedAppointment
                )
            )
    }
)

const deleteAppointment = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        if
            (
            !id
        ) {
            throw new ApiError(
                404,
                "id is required "
            )
        }

        const deletedAppointment = await Appointment.findByIdAndDelete({ _id: id });

        if (
            !deletedAppointment
        ) {
            throw new ApiError(
                404,
                "no deleted appointment found "
            )
        }

        res.status(200)
            .json(
                new ApiResponse(
                    200,
                    "deleted appointment ",
                    deletedAppointment
                )
            )

    }
)

export { createAppointment, getAppointmentById, getAppointments, updateAppointment, deleteAppointment };

