class Page extends require('./MainPage') {
    constructor () {
        super();
    }
    ready () {
        let $ = this.$;
        let bird = this.bird;

        $('.login').on('click', () => {
            location.href = '/login';
        })
    }
}

let page = new Page();
