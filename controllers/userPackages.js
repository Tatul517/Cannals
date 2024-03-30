import { compareSync, genSalt, hashSync } from 'bcrypt';
import { create } from '../services/userPackage.js';
import UserPackageModel from '../schemas/userPackages.js';
import getAddress from './map.js';
import jwt from 'jsonwebtoken'

const createUserPachage = async (req, res) => {
    try {
        const saltRounds=10;
        const {firstname,lastname, username, email,password, age, addres}= req.body
        const salt= await genSalt(saltRounds);
        const hashPassword= hashSync(`${password}`,salt);
        const emailRegex = /^[A-Za-z0-9]+@+[A-Za-z0-9]+\.[A_Za-z]{2,4}$/;
        if (!emailRegex) {
            return res.status(400).json({
                status:0,
                massage:"Error 400",
            });
        }
        // const userAddres=await getAddress(addres)
        // const {lat,lng}= userAddres;

        const user= await UserPackageModel.create({
            name:firstname,
            surname:lastname,
            username,
            email,
            age,
            password:hashPassword,
            // addres:{
            //     lat,
            //     lng
            // }
        });
        console.log(req.body);
        res.json({
            status:1,
            data:user,
            // addres:userAddres
        });

        // const data = await create(req.body);
        // res.json({
        //     status: data.status,
        //     data: data?.result || null
        // });
    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(500).json({
            status: 0,
            message: "Internal server error",
        });
    }
};

const login = async(req,res)=>{
    try{
        const {username, password}= req.body

        const user= await UserPackageModel.findOne({username})
        if (!user) {
            return res.status(400).json({
                status:0,
                massage:"User not Found",
            })
        }
        const passwordMatch= await compareSync(password,user.password)
        if (!passwordMatch) {
            return res.status(400).json({
                status:0,
                massage:"Incorrect password",
            })
        }
        const token=jwt.sign({
            id:user.id,
            username:user.username,
            name:user.name
        },jwtKey,{
            expiresIn:"1h"
        }
        )
        res.status(400).json({
            status:0,
            massage:"Incorrect password",
        })
    }
    catch(error){
        console.log("error during login",error);
        res.status(400).json({
            status:0,
            massage:"Internal server error",
        })
    }
};

const readUserPackage = async (req, res) => {
    try {
        const users = await UserPackageModel.find();
        res.json({
            status: 1,
            data: users,
        });
    } catch (error) {
        console.error("Error during fetching users:", error);
        res.status(500).json({
            status: 0,
            message: "Internal server error",
        });
    }
};

const updateUserPackage = async (req, res) => {
    try {
        const { id } = req.params; // Assuming you are passing user ID in URL params
        const newData = req.body;
        const updatedUser = await UserPackageModel.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                status: 0,
                message: "User not found",
            });
        }
        res.json({
            status: 1,
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error during updating user:", error);
        res.status(500).json({
            status: 0,
            message: "Internal server error",
        });
    }
};

const deleteUserPackage = async (req, res) => {
    try {
        const { id } = req.params; // Assuming you are passing user ID in URL params
        const deletedUser = await UserPackageModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                status: 0,
                message: "User not found",
            });
        }
        res.json({
            status: 1,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Error during deleting user:", error);
        res.status(500).json({
            status: 0,
            message: "Internal server error",
        });
    }
};

export {
    createUserPachage,
    login,
    readUserPackage,
    updateUserPackage,
    deleteUserPackage
};
