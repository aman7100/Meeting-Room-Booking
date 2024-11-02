import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entity/user';
import { Room } from './entity/room';
import { Booking } from './entity/booking';
import { config } from 'dotenv';
config()
const AppDataSource = new DataSource({
  type: 'postgres' ,
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASENAME,
  entities: [User, Room, Booking],
  logging: true,
  synchronize: true,
});
export default AppDataSource;
