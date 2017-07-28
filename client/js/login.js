class Page extends require('./MainPage') {
    constructor () {
        super();
        this.array = [];
    }

    ready () {
        let $ = this.$;
        let self = this;

        function hoverHandle(e) {
            self.pushArray($(e.target).attr('number'));
        }

        $(document).on('dragend', (e) => {
            e.preventDefault();
        })
        $(document).on('drop', (e) => {
            e.preventDefault();
        })

        $('.login-point').on('mousedown', (e) => {
            this.pushArray($(e.target).attr('number'));
            $('.login-point').on('mouseenter', hoverHandle);
        })

        $(document).on('mouseup', () => {
            $('.login-point').off('mouseenter', hoverHandle);
            console.log(this.getArray());
            this.clearArray();
        })
    }

    pushArray (data) {
        this.array.push(data);
    }

    getArray () {
        return this.array;
    }

    clearArray () {
        this.array = [];
    }
}

let page = new Page();
