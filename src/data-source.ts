import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entity/user';
import { Room } from './entity/room';
import { Booking } from './entity/booking';
const AppDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb://localhost:27017',
  database: 'new_meeting_room',
  entities: [User, Room, Booking],
  logging: true,
  synchronize:true
});
export default AppDataSource;
