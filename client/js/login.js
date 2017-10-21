class Page extends require('./MainPage') {
    constructor () {
        super();
        this.array = [];
    }

    ready () {
        let D = this.D;
        let self = this;

        function hoverHandle(e) {
            self.pushArray(D(e.target).attr('number'));
        }

        D(document).on('dragend', (e) => {
            e.preventDefault();
        })
        D(document).on('drop', (e) => {
            e.preventDefault();
        })

        D('.login-point').on('mousedown', (e) => {
            this.pushArray(D(e.target).attr('number'));
            D('.login-point').on('mouseenter', hoverHandle);
        })

        D(document).on('mouseup', () => {
            D('.login-point').off('mouseenter', hoverHandle);
            let pw = this.getArray();
            if (pw.length === 0) {
                return ;
            }
            this.sendData(pw);
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

    sendData (data) {
        // doSth
        this.bird.post('/login', data).then(res => {
            if (res && res.code === 1) {
                alert(res.msg);
                window.location.href = '/article';
            } else {
                alert(res.msg);
            }
        }).catch(e => {});
    }
}

let page = new Page();
