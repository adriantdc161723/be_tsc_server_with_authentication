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
    HasOne,
    HasMany} from 'sequelize-typescript';
import Tasks from './Tasks';

import Users from './Users';



@Table({ tableName: 'Infos'})
class Infos extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;
    @Column (DataType.STRING) name?: string;
    @Column (DataType.STRING) last_name?: string;
    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;

    @BelongsTo( ()=> Users, {
       foreignKey: "user_id",
        as: "user_info"
    })
    @ForeignKey( ()=> Users )
    @Column (DataType.INTEGER) user_id?: number;
}

export default Infos;