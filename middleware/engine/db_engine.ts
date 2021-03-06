import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
import AESHelper from '../../helper/aes_helper';
import { AbstractEngine } from '../abstract_engine';

export class DbEngine extends AbstractEngine {
    constructor() {
        super();
    }

    public decorator(app) {

        const config = {
            ...{
                name: 'yyfax_cms',
                dialect: 'mysql',
                modelPaths: [
                    path.join(app.config.rootPath, '/model'),
                ],
                timezone: '+08:00',
                operatorsAliases: false

            },
            ...app.config.dbConfig
        };

        if (app.config.env === 'production') {
            const pwd = config.password;
            config.password = AESHelper.decrypt(pwd, app.config.dbConfig.encryptKey);
        }
        const sequelize: any = new Sequelize(config);

        sequelize
            .authenticate()
            .then(() => {
                app.logger.info('Connection has been established successfully.');
            })
            .catch(err => {
                app.logger.error('Unable to connect to the database:', err);
            });

        app.sequelize = sequelize;
    }
};
