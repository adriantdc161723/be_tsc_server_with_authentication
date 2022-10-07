import express, {Router, Request, Response} from 'express';
import TaskController from '../controllers/task.controller';
import authService from '../services/auth.service';

const TaskRouter: Router = express.Router();

TaskRouter.post('/create-task', async (req: Request, res: Response) => {
   

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            const response = await TaskController.createTask(req.body);
            return res.status(response.status).send(response);
        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({message: "NO TOKEN!"});
    }

});


TaskRouter.get('/get-all-tasks', async (req: Request, res: Response) => {


    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            const response = await TaskController.getAllTask();
            return res.status(response.status).send(response);
        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

TaskRouter.post('/get-one-task/:id', async (req: Request, res: Response) => {
    

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            const response = await TaskController.getOneTask(parseInt(req.params.id));
            return res.status(response.status).send(response);
        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

TaskRouter.post('/delete-task/:id', async (req: Request, res: Response) => {
    
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            const response = await TaskController.deleteTask(parseInt(req.params.id));
            return res.status(response.status).send(response);
        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({message: "NO TOKEN!"});
    }

});




export default TaskRouter;