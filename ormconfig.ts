import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config : MysqlConnectionOptions={

  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'career_compass',
  synchronize: true,
  logging: true,
  entities: [
     __dirname + '/**/*.entity{.ts,.js}'
  ],
}

export default config;
