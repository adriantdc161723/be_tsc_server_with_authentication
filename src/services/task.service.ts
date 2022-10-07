import Tasks from '../models/tables/Tasks';
import Users from '../models/tables/Users';
import Infos from '../models/tables/Infos';

import ResponseUtil from '../utils/response.util';
import { CreateTask, GetOneTask } from "../models/dto/TaskDTO";


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


class TaskService extends ResponseUtil {

    async createTask (dto: CreateTask["requestObject"]){
        
        try {
            const create = await Tasks.create(dto);
            if(create){
                return this.RESPONSE(CREATED, create, 1, CREATED_MESSAGE)
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message);
        }

    }


    async getAllTask (){
        
        try {
               
            const find = await Tasks.findAll({
                include:{
                        model: Users,
                        as: "user",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        },
                    },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                where: { is_active: true}
            });

            if(find){
                return this.RESPONSE(OK, find, find.length, OK_MESSAGE)
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message);
        }

    }

    async getOneTask (dto: GetOneTask['taskID']){
        
        try {
               
            const find = await Tasks.findOne({
                include:{
                        model: Users,
                        as: "user",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        },
                    },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                where: { is_active: true, id: dto }
            });

            if(find){
                return this.RESPONSE(OK, find, 1, OK_MESSAGE)
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message);
        }

    }

    async deleteTask (dto: GetOneTask['taskID']){
        
        try {
               
            const update = await Tasks.update({ is_active: false }, { where: { id: dto } });

            if(update){
                return this.RESPONSE(OK, update, 1, `task: ${dto} successfully deleted`);
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message);
        }

    }

}

export default new TaskService;