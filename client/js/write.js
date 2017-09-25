class Page extends require('./MainPage') {
    constructor () {
        super();
    }
    ready () {
        let D = this.D;
        let bird = this.bird;

        D('.login').on('click', () => {
            bird.get('/api/test', {a:1,b:2}).then(res => console.log(res));
            bird.post('/api/test', {a:1,b:2}).then(res => console.log(res));
        })
        D('.write-area button[type="button"]').on('click', (e) => {
            this.submit();
        })
    }
    submit () {
        let D = this.D;
        let bird = this.bird;

        const data = {
            file_name: D('input[name="file_name"]').val() || this.getRandomNumber(),
            title: D('input[name="title"]').val(),
            author: D('input[name="author"]').val() || '铜方块',
            keywords: this.parseTags(D('input[name="keywords"]').val()) || [],
            description: D('input[name="description"]').val() || 'no description',
            content: D('textarea[name="content"]').val()
        };
        if (!this.check(data)) {
            alert('请至少填写标题和内容！')
            return false;
        };
        // console.log(data);
        bird.post('/api/article', data).then((res) => {
            if (res.code === 0) {
                alert(res.msg);
                return false;
            }
            location.href = '/article/' + data.file_name;
        }).catch(e => console.error(e));
    }
    check (obj) {
        let flag = true;
        for (let x in obj) {
            if (!obj[x]) flag = false;
        }
        return flag;
    }
    getRandomNumber() {
        return Math.floor(10000000 * Math.random());
    }
    parseTags(str) {
        let arr = str.split(',')
            .map((val) => val.replace(/^\s+|\s+D/g, ''))
            .filter((val) => (val !== '') ? true : false);
        if (arr[0] === '') {
            return [];
        } else {
            return arr;
        }
    }
}

let page = new Page();
