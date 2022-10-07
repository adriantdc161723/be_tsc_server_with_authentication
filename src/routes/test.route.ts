import express, {Router, Request, Response} from 'express';
const TestRouter: Router = express.Router();
import TestController from '../controllers/test.controller';


TestRouter.get('/test-data', async (req: Request, res: Response)=>{
    const response = await TestController.getTest();
    return res.status(200).send(response);
});

TestRouter.post('/create-test', async (req: Request, res: Response)=>{
    const response = await TestController.createTest(req.body);
    return res.status(200).send(response);
});

TestRouter.post('/get-test-by-id/:id', async (req: Request, res: Response)=>{
    const response = await TestController.getDataByID(parseInt(req.params.id));
    return res.status(200).send(response);
});

TestRouter.delete('/delete-test/:id', async (req: Request, res: Response)=>{
    const response = await TestController.deleteTest(parseInt(req.params.id));
    return res.status(200).send(response);
});



export default TestRouter;