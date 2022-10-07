import Infos from '../models/tables/Infos';
import ResponseUtil from '../utils/response.util';
import { CreateInfo } from "../models/dto/InfoDTO";


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


class InfoService extends ResponseUtil {

    async createInfo (dto: CreateInfo["requestObject"]){
        
        try {

            const find = await Infos.findOne({ where: { user_id: dto.user_id } });

            if(!find){

                const create = await Infos.create(dto);
                if(create){
                    return this.RESPONSE(CREATED, create, 1, CREATED_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }

            } else {

                const update = await Infos.update({
                    name: dto.name, 
                    last_name: dto.last_name
                }
                ,{ where: { user_id: dto.user_id }});

                if(update){
                    return this.RESPONSE(UPDATE, update, 1, UPDATE_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }

            }

          

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message);
        }

    }

}

export default new InfoService;