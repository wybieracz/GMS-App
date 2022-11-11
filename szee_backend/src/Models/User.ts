import { Column, DataType, IsEmail, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'users', timestamps: false })
export default class User extends Model<User> {

  @IsEmail
  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.CHAR(60), allowNull: false })
  hash!: string;

  @Column(DataType.TEXT)
  name!: string;

  @Column(DataType.TEXT)
  surname!: string;

  public getUserDTO(): UserDTO {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      surname: this.surname
    }
  }
}

export interface IUser {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface UserDTO {
  id: number;
  email: string;
  name: string;
  surname: string;
}