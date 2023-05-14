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
        authorName: {
            type: String,
            required: true,
        },
        authorId: {
            type: String,
            required: true,
        },
        isPublish: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    { timestamp: true }
);

const Post = model("Post", postSchema);

module.exports = Post;