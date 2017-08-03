class LoginDbController extends require('./db.js') {
    constructor(dbName, url) {
        super(dbName, url);
        this.Model = this.createModel('user', {
            user_name: "string",
            password: "string",
            secret_string: "string",
            block: "string"
        });

    }
    add(obj) {
        let article = new(this.Model)({
            user_name: obj.name,
            password: obj.password,
            secret_string: obj.secret_string,
            block: obj.block
        });
        return new Promise((resolve, reject) => {
            article.save((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                };
            });
        })
    }
    update(sort, obj) {
        return new Promise((resolve, reject) => {
            this.Model.update(sort, {
                $set: {
                    user_name: obj.name,
                    password: obj.password,
                    secret_string: obj.secret_string,
                    block: obj.block
                }
            }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                };

            })
        })
    }
    remove(obj) {
        return new Promise((resolve, reject) => {
            this.Model.remove(obj, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                };

            })
        });
    }
    find(obj) {
        return new Promise((resolve, reject) => {
            this.Model.find(obj, (err, data) => {
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

module.exports = new LoginDbController('blog', require('../config.js').dbPath);
