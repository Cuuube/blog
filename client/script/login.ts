/// <reference path="./MainPage.ts" />

{
    
class Page extends MainPage {
    private array: string[];

    constructor () {
        super();
    }

    ready () {
        let D = this.D;
        let self = this;

        function hoverHandle(e: Event) {
            self.pushArray(D(e.target).attr('number'));
        }

        D(document).on('dragend', (e: Event) => {
            e.preventDefault();
        })
        D(document).on('drop', (e: Event) => {
            e.preventDefault();
        })

        D('.login-point').on('mousedown', (e: Event) => {
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

    pushArray (data: any) {
        this.array.push(data);
    }

    getArray (): string[] {
        return this.array;
    }

    clearArray () {
        this.array = [];
    }

    sendData (data: string[]) {
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

new Page();

}