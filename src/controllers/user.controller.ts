import UserService from "../services/user.service";
import { CreateUser } from '../models/dto/UserDTO';

class UserController{

    async createUser (dto: CreateUser["requestObject"]){
        const response = await UserService.createUser(dto);
        return response;
    }

    async getAllUser (){
        const response = await UserService.getAllUsers();
        return response;
    }


    async getOneUser (userID: number){
        const response = await UserService.getOneUser(userID);
        return response;
    }

    async deleteUser (userID: number){
        const response = await UserService.deleteUser(userID);
        return response;
    }

    async userLogin (requestObject: any){
        const response = await UserService.userLogin(requestObject);
        return response;
    }

    
}

export default new UserController;