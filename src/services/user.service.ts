import Users from "../models/tables/Users";
import Tasks from "../models/tables/Tasks";
import Infos from "../models/tables/Infos";

import ResponseUtil from '../utils/response.util';
import { CreateUser } from "../models/dto/UserDTO";
import * as bcrypt from 'bcrypt';


//response constants and messages
import {
    OK, 
    NOTFOUND, 
    BADREQUEST, 
    CREATED, 
    UPDATE, 
    INTERNAL_SERVER_ERROR
} from '../utils/constants.util';

import {
    OK_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE
} from '../utils/message.util';
import e from "express";
import authService from "./auth.service";


class UserService extends ResponseUtil {

    async userLogin (requestObject: any) {

        try {

            const exist = await Users.findOne({where: {username: requestObject.username}});

            if(exist){

                const userHashedpassword: any = exist.password;
                const matchPassword = await bcrypt.compare(requestObject.password, userHashedpassword);

                const extracted = {
                    id: exist.id, 
                    username: exist.username, 
                    password: exist.password, 
                    createdAt: exist.createdAt, 
                    updatedAt: exist.updatedAt}

                if(matchPassword){
                    const token = await authService.auth(extracted);
                    console.log("\n\n\n\nTOKEN RESPONSE", token, "\n\n\n\n\n\n\n");
                    return this.RESPONSE(OK, token.response, 1, OK_MESSAGE);
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, "Password not matched");
                }

                
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, "User does not exist");
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }

    }

    async createUser (dto: CreateUser["requestObject"]){
        
        try {

            const exist = await Users.findOne({ where: { username: dto.username } });

            if(dto.password === dto.confirmPassword){
                if(!exist){
                    const passwordHashed = await bcrypt.hash(dto.password, 10);
                    const create = await Users.create({
                        username: dto.username,
                        password: passwordHashed,
                        is_active: true
                    });
                    if(create){
                        return this.RESPONSE(CREATED, create, 1, CREATED_MESSAGE)
                    } else {
                        return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                    }
    
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, "Username already exist");
                }
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, "Password not matched!");
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }

    }


    async getAllUsers () {

        try {
            
            const find = await Users.findAll({
                include: [
                    {
                        model: Infos,
                        as: "user_info",
                        attributes: {
                            exclude: ["user_id", "id", "createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: Tasks,
                        as: "user_tasks",
                        attributes: {
                            exclude: ["user_id", "id", "createdAt", "updatedAt"]
                        }
                    }

                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                where: { is_active: true }
            });



            if(find){
                return this.RESPONSE(OK, find, find.length, OK_MESSAGE);
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }

    }


    async getOneUser (userID: number) {

        try {
            
            const find = await Users.findOne({
                include: [
                    {
                        model: Infos,
                        as: "user_info",
                        attributes: {
                            exclude: ["user_id", "id", "createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: Tasks,
                        as: "user_tasks",
                        attributes: {
                            exclude: ["user_id", "id", "createdAt", "updatedAt"]
                        }
                    }

                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                where: { id: userID , is_active: true }
            });



            if(find){
                return this.RESPONSE(OK, find, 0, OK_MESSAGE);
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }

    }


    async deleteUser (userID: number) {

        try {
            
            const update = await Users.update({ is_active: false }, { where: { id: userID } });
            if(update){
                return this.RESPONSE(OK, update, 1, `user: ${userID} successfully deleted`);
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }

    }

}

export default new UserService;