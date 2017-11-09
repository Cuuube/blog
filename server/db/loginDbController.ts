import Db from './db';
import config from '../config.js';
import { mdl } from '../model/db';

class LoginDbController extends Db {
    private Model: any;
    constructor(dbName: string, url?: string) {    

        super(dbName, url);
        this.Model = this.createModel('user', new mdl.User);
    }

    add(userData: mdl.User) {
        let Model = this.Model;
        let article = new Model;
        return new Promise((resolve, reject) => {
            article.save((err: Error) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                };
            });
        })
    }

    update(params: obj, data: obj) {
        return new Promise((resolve, reject) => {
            this.Model.update(params, {
                $set: {
                    user_name: data.name,
                    password: data.password,
                    secret_string: data.secret_string,
                    block: data.block
                }
            }, (err: Error) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                };

            })
        })
    }

    remove(params: obj, data: obj) {
        return new Promise((resolve, reject) => {
            this.Model.remove(params, (err: Error) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                };

            })
        });
    }

    find(params: obj) {
        return new Promise((resolve, reject) => {
            this.Model.find(params, (err: Error, data: obj) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                };

            })
        })
    }
    
    // now() {
    //     return new Date();
    // }
}

const dbPath = config.dbPath;

export default new LoginDbController('blog', dbPath);
