import { createChannel, getAllChannels, deleteChannel, updateChannel } from '../services/channel.js';

const get = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1) * limit;

        const filter = req.query;
        const data = await getAllChannels(filter, skip, limit);

        res.json({
            status: 1,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 0,
            message: "Internal server error"
        });
    }
};

const create = async (req, res) => {
    try {
        const data = await createChannel(req.body);
        res.json({
            status: data.status,
            data: data?.result || null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 0,
            message: "Internal server error"
        });
    }
};

const remove = async (req, res) => {
    try {
        const channelId = req.params.id;
        await deleteChannel(channelId);
        res.json({
            status: 1,
            message: "Channel deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 0,
            message: "Internal server error"
        });
    }
};

const update = async (req, res) => {
    try {
        const channelId = req.params.id;
        const updateData = req.body;
        const data = await updateChannel(channelId, updateData);
        res.json({
            status: 1,
            data: data?.result || null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 0,
            message: "Internal server error"
        });
    }
};

export {
    getAll,
    create,
    remove,
    update
};
