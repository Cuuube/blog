const ac = require('../server/db/articleDbController');
ac.add({
    file_name: 'a_good_day2',
    title: '不错的一天2',
    author: 'Sater',
    keywords: ['day','good','too'],
    description: '222简a介aaaaaaaaa',
    content: '### 今天真是不错的一天啊啊啊 啊啊啊啊 啊啊啊啊 啊啊啊啊 啊啊啊啊 啊啊啊啊 啊` qwe` "asda" !@#$%^&*()_+=-0\';:""AQEQWEYTUIOPQJNJBSVdbjhwfbejqkwfeqwl~'
}).then(()=>{console.log('su')})

ac.find({}).then((data) => {
    console.log(data);
}).catch(e=>console.log(e));

// ac.remove({
//     file_name: 'a_good_day'
// }).then(()=>{console.log('rm')})

ac.update({_id: '5966f8a7b197c7b4ec146cd5'}, {title: 'helle world'}).then(()=>console.log('up'))