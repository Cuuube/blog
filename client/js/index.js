const $ = require('../utils/dom');
// const $ = require('jquery');
const Getter = require('../utils/getter');

let getter = new Getter();
$('.login').on('click', () => {
    // 同时发两条会冲突
    getter.get('/api/test', {a:1,b:2}).then(res => console.log(res));
    getter.post('/api/test', {a:1,b:2}).then(res => console.log(res));
})