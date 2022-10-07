import TestService from "../services/test.service";

class TestController{
    async getTest () {
        const response = await TestService.getTest();
        return response;
    }

    async createTest (dto: any) {
        const response = await TestService.createTest(dto);
        return response;
    }

    async deleteTest (testID: number){
        const response = await TestService.deleteTest(testID);
        return response;
    }

    async getDataByID ( testID: number){
        const response = await TestService.getTestByID(testID);
        return response;
    }
}

export default new TestController;