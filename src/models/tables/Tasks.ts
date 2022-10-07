import {
    Table, 
    Column, 
    DataType, 
    Model, 
    CreatedAt, 
    UpdatedAt, 
    PrimaryKey, 
    AutoIncrement, 
    BelongsTo,
    ForeignKey,
    HasOne} from 'sequelize-typescript';


import Infos from './Infos';
import Users from './Users';



@Table({ tableName: 'Tasks'})
class Tasks extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;
    @Column (DataType.STRING) task_name?: string;
    @Column (DataType.STRING) task_desc?: string;
    @Column (DataType.STRING) task_day?: string;
    @Column (DataType.BOOLEAN) is_active?: boolean;
    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
    
    @BelongsTo(()=> Users, {
        foreignKey: "user_id",
        as: "user"
    })
    @ForeignKey(()=> Users )
    @Column (DataType.INTEGER) user_id?: number;
}

export default Tasks;