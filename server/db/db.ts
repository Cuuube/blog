import * as mongoose from 'mongoose';

export default class Db {
    protected name: string;
    protected mongoose: any = mongoose;
    constructor (dbName: string, url?: string) {
        this.name = dbName;
        this.mongoose.connect(url);
    }
    createModel (name: string, obj: obj) {
        return this.mongoose.model(name, obj);
    }
    // add (model: any) {
    //     return Promise;
    // }
    // update () {
    //     return Promise;
    // }
    // remove () {
    //     return Promise;
    // }
    // find (model: obj) {
    //     return Promise<T>;
    // }

}
// new Db('blog', 'mongodb://localhost/blog');