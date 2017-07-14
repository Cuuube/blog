class ArticleController extends require('./db.js') {
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
            created_time: this.now(),
            updated_time: this.now(),
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

module.exports = new ArticleController('blog', require('../config.js').dbPath);

// ac.add({
//     file_name: 'a_good_day2',
//     title: '不错的一天2',
//     author: 'Sater',
//     keywords: ['day','good','too'],
//     description: '222简a介aaaaaaaaa',
//     content: '### 今天真是不错的一天啊啊啊 啊啊啊啊 啊啊啊啊 啊啊啊啊 啊啊啊啊 啊啊啊啊 啊` qwe` "asda" !@#$%^&*()_+=-0\';:""AQEQWEYTUIOPQJNJBSVdbjhwfbejqkwfeqwl~'
// }).then(()=>{console.log('su')})

// ac.find({}).then((data) => {
//     console.log(data);
// }).catch(e=>console.log(e));

// ac.remove({
//     file_name: 'a_good_day'
// }).then(()=>{console.log('rm')})

// ac.update({_id: '5966f8a7b197c7b4ec146cd5'}, {title: 'helle world'}).then(()=>console.log('up'))