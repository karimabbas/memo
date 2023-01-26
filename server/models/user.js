import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

export default User