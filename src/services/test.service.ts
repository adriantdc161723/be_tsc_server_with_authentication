import Test from '../models/tables/test';
import ResponseUtil from '../utils/response.util';
import { AddTestDTO } from '../models/dto/TestDTO';

class TestService extends ResponseUtil {

    async createTest (dto: AddTestDTO["requestObject"]) {
        try {
            const create = await Test.create(dto);

            console.log("\n\n\nDTO LOG::::::", dto, typeof dto, "\n\n\n");
            
            if(create){
                return this.RESPONSE(200, create, 0, "OK");
            }else{
                return this.RESPONSE(400    , create, 0, "BAD REQUEST");
            }

        } catch (error: any) {
            return this.RESPONSE(500, error.message, 0, "INTERNAL SERVER ERROR");
        }
    }

    async getTest () {
        try {
            
            const find = await Test.findAll();

            if(find.length){
                return this.RESPONSE(200, find, 0, "OK");
            } else {
                return this.RESPONSE(404, {}, 0, "NO RECORD FOUND");
            }
            

        } catch (error: any) {
            return this.RESPONSE(500, error.message, 0, "INTERNAL SERVER ERROR");
        }
    }

    async getTestByID (testID: number) {
        try {
            
            const find = await Test.findOne({ where: { id: testID } });

            if(find){
                return this.RESPONSE(200, find, 0, "OK");
            } else {
                return this.RESPONSE(404, {}, 0, "NO RECORD FOUND");
            }
            

        } catch (error: any) {
            return this.RESPONSE(500, error.message, 0, "INTERNAL SERVER ERROR");
        }
    }

    async deleteTest (testID: number) {
        try {
            
            const deleteTest = await Test.destroy({where: { id: testID } });

            if(deleteTest){
                return this.RESPONSE(200, deleteTest, 0, "SUCCESSFULY DELETED");
            } else {
                return this.RESPONSE(404, {}, 0, "CANNOT DELETE DATA");
            }
            

        } catch (error: any) {
            return this.RESPONSE(500, error.message, 0, "INTERNAL SERVER ERROR");
        }
    }
}

export default new TestService();