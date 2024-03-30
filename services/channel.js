import Channel from '../schemas/channels.js';

const createChannel = async (data) => {
    try {
        const result = await Channel.create(data);
        return {
            status: 1,
            result
        };
    } catch (error) {
        console.log(error);
        return {
            status: 0,
            error: error.message
        };
    }
};

const getAllChannels = async (data) => {
    try {
        const filter = {};
        if (data.title) {
            filter.title = {
                $regex: data.title,
                $options: 'i'
            };
        }

        const count = await Channel.countDocuments(filter);
        const result = await Channel.find(filter, {}, {
            limit: +data.limit,
            sort: {
                createdAt: data.sort === "desc" ? -1 : 1
            },
            skip: data.page > 0 ? (data.page - 1) * data.limit : 0
        });
        return {
            status: 1,
            result,
            count
        };
    } catch (error) {
        console.log(error);
        return {
            status: 0,
            error: error.message
        };
    }
};

const updateChannel = async (channelId, newData) => {
    try {
        const result = await Channel.findByIdAndUpdate(channelId, newData, { new: true });
        if (!result) {
            return {
                status: 0,
                error: "Channel not found"
            };
        }
        return {
            status: 1,
            result
        };
    } catch (error) {
        console.log(error);
        return {
            status: 0,
            error: error.message
        };
    }
};

const deleteChannel = async (channelId) => {
    try {
        const result = await Channel.findByIdAndDelete(channelId);
        if (!result) {
            return {
                status: 0,
                error: "Channel not found"
            };
        }
        return {
            status: 1,
            result
        };
    } catch (error) {
        console.log(error);
        return {
            status: 0,
            error: error.message
        };
    }
};

export { createChannel, getAllChannels, updateChannel, deleteChannel };
