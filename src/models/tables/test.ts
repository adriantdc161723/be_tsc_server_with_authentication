import {Table, Column, DataType, Model, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement} from 'sequelize-typescript';



@Table({ tableName: 'Test'})
class Test extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;
    @Column (DataType.STRING) name?: string;
    @Column (DataType.STRING) test_data?: string;
    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
}

export default Test;