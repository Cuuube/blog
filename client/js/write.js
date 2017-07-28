(() => {
    const $ = require('../utils/dom');
    const Getter = require('../utils/getter');
    const getter = new Getter();

    $('.write-area button[type="button"]').on('click', (e) => {
        submit();
    })

    function submit() {
        const data = {
            file_name: document.querySelector('input[name="file_name"]').value || getRandomNumber(),
            title: document.querySelector('input[name="title"]').value || 'No title',
            author: document.querySelector('input[name="author"]').value || '铜方块',
            keywords: parseTags(document.querySelector('input[name="keywords"]').value) || [],
            description: document.querySelector('input[name="description"]').value,
            content: document.querySelector('textarea[name="content"]').value
        };
        console.log(data);
        getter.post('/api/article', data).then((res) => {
            console.log(res);
        }).catch(e => console.error(e));
    }

    function getRandomNumber() {
        return Math.floor(10000000 * Math.random());
    }

    function parseTags(str) {
        let arr = str.split(',')
            .map((val) => val.replace(/^\s+|\s+$/g, ''))
            .filter((val) => (val !== '') ? true : false);
        if (arr[0] === '') {
            return [];
        } else {
            return arr;
        }
    }

})();