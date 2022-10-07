import InfoService from "../services/info.service";
import { CreateInfo } from '../models/dto/InfoDTO';

class InfoController{
    async createInfo (dto: CreateInfo["requestObject"]){
        const response = await InfoService.createInfo(dto);
        return response;
    }
}

export default new InfoController;