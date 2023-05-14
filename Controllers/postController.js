const User = require("../Models/userModel");
const Post = require("../Models/postModel");

const postController = {
    create: async (req, res) => {
        try {
            const { title, content, isPublish } = req.body;
            const user = await User.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            const newPost = new Post({
                title, content, authorName: user.name, authorId: user._id, isPublish
            })
            await newPost.save()
            return res.status(200).json({ msg: "Post Successfully Created." });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const pid = req.params.pid
            const { title, content, isPublish } = req.body;
            await Post.findOneAndUpdate({ _id: pid }, {
                title, content, isPublish
            })
            return res.status(200).json({ msg: "Post Successfully Updated." });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const pid = req.params.pid
            await Post.findByIdAndDelete(pid)
            return res.status(200).json({ msg: "Post Successfully Deleted." });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find()
            return res.status(200).json(posts);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getPostById: async (req, res) => {
        try {
            const pid = req.params.pid
            const post = await Post.findById(pid)
            return res.status(200).json(post);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getMyPosts: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            const posts = await Post.find({ authorId: user_id })
            return res.status(200).json({ msg: "Signout success." });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
}


module.exports = postController;