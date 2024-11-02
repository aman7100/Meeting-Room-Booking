import express from 'express';
import { json } from 'express';
import routes from './routes/routes';
import AppDataSource from './data-source';
import {config} from 'dotenv';

config();

const app = express();

app.use(json());
app.use('/api', routes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
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