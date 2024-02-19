import mongoose, { Schema } from "mongoose"

const PostSchema = new Schema({
    postContent: {
        type: String,
        required: [true, "Post content is reuiqred"],
    },
    postImage: {
        type: String,
    },
    ownerId: {
        type: mongoose.ObjectId
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}
)

export const PostModel = mongoose.model("Post", PostSchema)