class Page extends require('./MainPage') {
    constructor () {
        super();
    }
    ready () {
        let $ = this.$;
        let bird = this.bird;

        $('.login').on('click', () => {
            bird.get('/api/test', {a:1,b:2}).then(res => console.log(res));
            bird.post('/api/test', {a:1,b:2}).then(res => console.log(res));
        })
    }
}

let page = new Page();
