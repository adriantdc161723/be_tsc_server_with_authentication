import express, {Router, Request, Response} from 'express';
import InfoController from '../controllers/info.controller';
import ResponseUtil from '../utils/response.util';
import authService from '../services/auth.service';

const ru = new ResponseUtil;

const InfoRouter: Router = express.Router();

InfoRouter.post('/create-info', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            const response = await InfoController.createInfo(req.body);
            return res.status(response.status).send(response);
        }else{
            return res.status(authenticate.status).send(authenticate);
        }

    }else{
        return res.status(400).send({message: "NO TOKEN!"});
    }

    
})



export default InfoRouter;