class CreateTask {
    requestObject?: any = {
        task_name: "",
        task_desc: "",
        task_day: "",
        is_active: null,
        user_id: null,
    }
}

class GetOneTask {
    taskID?: number = 0;
}


export { CreateTask, GetOneTask };