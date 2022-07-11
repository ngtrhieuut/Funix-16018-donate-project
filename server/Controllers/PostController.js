import PostModel from "../Models/postModel.js"; 
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

//Create new Post
export const createPost = async (req, res) => { 
  const newPost = new PostModel(req.body);
    
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get a Post
export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post =  await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Update a Post
export const updatePost = async (req, res) => {
    const postId = req.params.id;

    const { userId } = req.body;

    try { 
        const post = await PostModel.findById(postId);
        if (post) {
            await post.updateOne({$set: req.body});
            res.status(200).json("post updated");
        } else {
            res.status(403).json("Acction forbidden")
        }

    } catch (error) {
        res.status(500).json(error);
    }
};

//Delete a Post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    try { 
        const post = await PostModel.findById(id);
        if (post) {
            await post.deleteOne();
            res.status(200).json("post deleted");
        } else {
            res.status(403).json("Acction forbidden")
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get Timeline Posts
export const getAllPosts = async (req, res) => {
    const userId = req.params.id
    try {
      const currentUserPosts = await PostModel.find();
  
      res.status(200).json(
        currentUserPosts
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };