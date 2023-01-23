import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const deletePost = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No Post with that id");
    } else {
        try {
            const deletedPost = await PostMessage.findByIdAndDelete(id);
            res.json(`${deletedPost} Deleted Successfully`);
        } catch (error) {
            console.log(error)
        }
    }
}

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags });

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const UpdatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that id");

    const UpdatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(201).json(UpdatedPost);
}

export const LikePost = async (req, res) => {
    const { id, type } = req.params;
    console.log(type);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that id");

    const MoreLikes = await PostMessage.findById(id);
    // const UpdatedPost = MoreLikes.upd
    if (type === 'LoveCount') {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { LoveCount: MoreLikes.LoveCount + 1 }, { new: true });
        res.status(201).json(updatedPost);

    } else if (type === 'likeCount') {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: MoreLikes.likeCount + 1 }, { new: true });
        res.status(201).json(updatedPost);
    }
    // console.log(updatedPost);
}