import mongoose, { Schema } from "mongoose"

const PostSchema = new Schema({
    postContent: {
        type: String,
        required: [true, "Post content is reuiqred"],
    },
    postImage: {
        type: String,
    }
}, {
    timestamps: true
}
)

export const ProductModel = mongoose.model("Post", PostSchema)