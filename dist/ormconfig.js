"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    database: 'career_compass',
    synchronize: true,
    logging: true,
    entities: [
        __dirname + '/**/*.entity{.ts,.js}',
    ],
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map