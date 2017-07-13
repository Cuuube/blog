module.exports = class Db {
    constructor (dbName, url) {
        this.name = dbName;
        this.mongoose = require('mongoose');
        this.mongoose.connect(url);
    }
    createModel (name, obj) {
        return this.mongoose.model(name, obj);
    }
    add (model) {
        model.save(err => {if (err) {console.error(err)}});
        return this;
    }
    update () {

    }
    remove () {

    }
    find (model) {
        return new Promise((resolve, reject) => {
            try {
                model.find((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                })
            } catch (err) {
                reject(err);
            }
        }).catch((e) => {
            console.log(e);
        })
    }

}
// new Db('blog', 'mongodb://localhost/blog');