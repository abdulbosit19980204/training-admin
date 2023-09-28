import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    userImg: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adress: { type: String, required: true },
    city: { type: String, required: true },
    position: { type: String, required: true },
    zip: { type: String, required: String },
    admin: { type: String, required: true },
    status: { type: String, required: true },

})

const User = model("User", UserSchema)
export default User