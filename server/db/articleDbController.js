class ArticleDbController extends require('./db.js') {
    constructor(dbName, url) {
        super(dbName, url);
        this.Model = this.createModel('article', {
            file_name: "string",
            title: "string",
            author: "string",
            keywords: "array",
            description: "string",
            created_time: "Date",
            updated_time: "Date",
            content: "string"
        });

    }
    add(obj) {
        let article = new(this.Model)({
            file_name: obj.file_name,
            title: obj.title,
            author: obj.author,
            keywords: obj.keywords,
            description: obj.description,
            created_time: obj.created_time || this.now(),
            updated_time: obj.updated_time || this.now(),
            content: obj.content
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
                    title: obj.title,
                    keywords: obj.keywords,
                    description: obj.description,
                    updated_time: this.now(),
                    content: obj.content
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
    now() {
        return new Date();
    }
}

module.exports = new ArticleDbController('blog', require('../config.js').dbPath);
