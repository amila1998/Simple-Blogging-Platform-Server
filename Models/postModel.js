const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter Post Title"],
        },
        content: {
            type: String,
        },
        author: {
            name:String,
            id:String,
            avatar:String
        },
        isPublish: {
            type: Boolean,
            default: false,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updateAt: {
            type: Date,
            required: true,
        },

    },
    { timestamp: true }
);

const Post = model("Post", postSchema);

module.exports = Post;