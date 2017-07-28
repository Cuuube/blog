class Page extends require('./MainPage') {
    constructor () {
        super();
    }
    ready () {
        let $ = this.$;
        let getter = this.getter;

        $('.login').on('click', () => {
            getter.get('/api/test', {a:1,b:2}).then(res => console.log(res));
            getter.post('/api/test', {a:1,b:2}).then(res => console.log(res));
        })
        $('.write-area button[type="button"]').on('click', (e) => {
            this.submit();
        })
    }
    submit () {
        let $ = this.$;
        let getter = this.getter;

        const data = {
            file_name: $('input[name="file_name"]').val() || this.getRandomNumber(),
            title: $('input[name="title"]').val() || 'No title',
            author: $('input[name="author"]').val() || '铜方块',
            keywords: this.parseTags($('input[name="keywords"]').val()) || [],
            description: $('input[name="description"]').val(),
            content: $('textarea[name="content"]').val()
        };
        // console.log(data);
        getter.post('/api/article', data).then((res) => {
            if (res.code === 0) {
                alert(res.msg);
                return false;
            }
            location.href = '/article/' + data.file_name;
        }).catch(e => console.error(e));
    }
    getRandomNumber() {
        return Math.floor(10000000 * Math.random());
    }
    parseTags(str) {
        let arr = str.split(',')
            .map((val) => val.replace(/^\s+|\s+$/g, ''))
            .filter((val) => (val !== '') ? true : false);
        if (arr[0] === '') {
            return [];
        } else {
            return arr;
        }
    }
}

let page = new Page();
