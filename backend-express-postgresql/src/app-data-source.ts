import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'gmz',
  password: '',
  database: 'twitter',
  entities: ['dist/src/entity/*.js'],
  logging: true,
  synchronize: true,
});
