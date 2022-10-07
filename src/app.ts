import express, {Application, Request, json, Response} from 'express';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import config from './config/config';

const app: Application = express();
const env_config: DotenvConfigOutput = dotenv.config();
const port = process.env.PORT || 1617;


//Middleware
app.use(json());

//Modules
import UserRouter from './routes/user.route';
import InfoRouter from './routes/info.route';
import TaskRouter from './routes/task.route';

//Routes
app.use(UserRouter);
app.use(InfoRouter);
app.use(TaskRouter);


let serve = async () => {
    await config.authenticate();
    await config.sync({force: false});
    app.listen(port, ()=>{
        console.log("Connected to port:", port);
    });    
}

serve();


