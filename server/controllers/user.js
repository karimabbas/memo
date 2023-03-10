import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const ExistingUser = await UserModel.findOne({ email });
        if (ExistingUser) {
            return res.status(400).json({ message: "User already Existing" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id }, 'SecretKey', { expiresIn: "1h" });

        res.status(201).json({ result, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something Wrong, please enter vaild values" });
    }
}

export const SignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User dosen't Exist" });
        }

        const isPasswordCorrect = bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, 'SecretKey', { expiresIn: "1h" });

        res.status(200).json({ result: user, token });

    } catch (error) {
        res.status(500).json({ message: "Email Or Password Is Invaild" });
    }
}