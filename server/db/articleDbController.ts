import Db from './db';
import config from '../config.js';
import { mdl } from '../model/db';

class ArticleDbController extends Db {
    private Model: any;
    constructor(dbName: string, url?: string) {
        super(dbName, url);
        this.Model = this.createModel('article', new mdl.Article);
    }

    add(articleData: mdl.Article) {
        let Model = this.Model;
        let article = new Model({
            file_name: articleData.file_name,
            title: articleData.title,
            author: articleData.author,
            keywords: articleData.keywords,
            description: articleData.description,
            created_time: articleData.created_time || this.now(),
            updated_time: articleData.updated_time || this.now(),
            content: articleData.content
        });
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
                    title: data.title,
                    keywords: data.keywords,
                    description: data.description,
                    updated_time: this.now(),
                    content: data.content
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

    remove(params: object) {
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
    now() {
        return new Date();
    }
}

const dbPath = config.dbPath;

export default new ArticleDbController('blog', dbPath);
