import mongoose from "mongoose";

const UserPackages = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "User",
    },
    channelIds: [
        {
            type: mongoose.ObjectId,
            ref: "Channels",
        }
    ],
    type: [
        {
            channelId: {
                type: mongoose.ObjectId,
                ref: "Channels",
            },
            type: {
                type: String
            },
            expireDate: {
                type: Date
            },
            status: {
                type: Number,
                default: 1
            }
        }
    ]
}, {
    timestamps: true
});
const UserPackageModel = mongoose.model('UserPackages', UserPackages);

export default UserPackageModel;