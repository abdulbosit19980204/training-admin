import { Schema, model } from "mongoose";

const PartSchema = new Schema({
    lessonsTypeName: { type: String, required: true },
    lessonsTypeImg: { type: String, required: true },
    restaurant: { type: String, required: true },
    kitchenSection: { type: String, required: true },
}, {
    timestamps: true,
})

const Part = model("Part", PartSchema)
export default Part