import mongoose from "mongoose";

const Channels = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    packages: {
        daily: Number,
        weekly: Number,
        mounthly: Number
    },
    currency: {
        type: String,
        default: "USD"
    }
}, {
    timestamps: true
});

const ChannelModel = mongoose.model('channels', Channels);

export default ChannelModel;