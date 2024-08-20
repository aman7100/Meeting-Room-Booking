import express from 'express';
import { json } from 'express';
import routes from './routes/routes';
import AppDataSource from './data-source';
import {config} from 'dotenv';
import { error } from 'console';
import { User } from './entity/user';
import { Room } from './entity/room';
import { getRepository } from 'typeorm';

config();

const app = express();
const port = 3000;

app.use(json());
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const startApp = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!')
  }

    
    catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
}
startApp()