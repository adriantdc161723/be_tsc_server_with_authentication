import {Table, Column, DataType, Model, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, HasOne, HasMany } from 'sequelize-typescript';
import Infos from './Infos';
import Tasks from './Tasks';


@Table({ tableName: 'Users'})
class Users extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;
    @Column (DataType.STRING) username?: string;
    @Column (DataType.STRING) password?: string;
    @Column (DataType.BOOLEAN) is_active?: boolean;
    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
    @HasOne( ()=> Infos, {
        foreignKey: "user_id",
        as: "user_info"
    })
    user_info?: Infos[] = [];

    @HasMany( ()=> Tasks, {
        foreignKey: "user_id",
        as: "user_tasks"
    })
    user_tasks?: Tasks[] = [];
}

export default Users;