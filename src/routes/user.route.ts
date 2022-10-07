import express, {Router, Request, Response} from 'express';
import UserController from '../controllers/user.controller';
import authService from '../services/auth.service';

const UserRouter: Router = express.Router();

UserRouter.post('/user-login', async (req: Request, res: Response) => {
    const response = await UserController.userLogin(req.body);
    return res.status(response.status).send(response);
});

UserRouter.post('/create-user', async (req: Request, res: Response) => {
    const response = await UserController.createUser(req.body);
    return res.status(response.status).send(response);
});

UserRouter.get('/get-all-users', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            const response = await UserController.getAllUser();
            return res.status(response.status).send(response);
        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({message: "NO TOKEN!"});
    }
    
});



UserRouter.post('/get-one-user/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            const response = await UserController.getOneUser(parseInt(req.params.id));
            return res.status(response.status).send(response);
        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({message: "NO TOKEN!"});
    }

});



UserRouter.post('/delete-user/:id', async (req: Request, res: Response) => {


    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            const response = await UserController.deleteUser(parseInt(req.params.id));
            return res.status(response.status).send(response);
        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({message: "NO TOKEN!"});
    }

});



export default UserRouter;