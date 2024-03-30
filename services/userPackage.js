import UserPackage from '../schemas/userPackages.js'

const create = async (data) => {
    try {
        const result = await UserPackage.create(data);
        return {
            status: 1,
            result
        }
    } catch (error) {
        return {
            status: 0,
        }
    }
}

export {
    create
}