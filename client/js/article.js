class Page extends require('./MainPage') {
    constructor () {
        super();
    }
    ready () {
        let $ = this.$;
        
        $('.to-top').on('click', () => {
            window.scroll(0,0);
        })
    }
}

let page = new Page();
