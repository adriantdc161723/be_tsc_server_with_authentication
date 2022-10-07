import TaskService from "../services/task.service";
import { CreateTask, GetOneTask } from '../models/dto/TaskDTO';

class TaskController{
    async createTask (dto: CreateTask["requestObject"]){
        const response = await TaskService.createTask(dto);
        return response;
    }

    async getAllTask (){
        const response = await TaskService.getAllTask();
        return response;
    }

    async getOneTask (dto: GetOneTask['taskID']){
        const response = await TaskService.getOneTask(dto);
        return response;
    }

    async deleteTask (dto: GetOneTask['taskID']){
        const response = await TaskService.deleteTask(dto);
        return response;
    }

}

export default new TaskController;