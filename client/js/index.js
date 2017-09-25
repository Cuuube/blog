class Page extends require('./MainPage') {
    constructor () {
        super();
    }
    ready () {
        let D = this.D;
        let bird = this.bird;

        D('.login').on('click', () => {
            location.href = '/login';
        })
        console.log(D)
    }
}

let page = new Page();
