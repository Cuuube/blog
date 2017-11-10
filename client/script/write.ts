/// <reference path="./MainPage.ts" />


{

class Page extends MainPage {
    constructor () {
        super();
    }

    ready () {
        let D = this.D;

        // D('.login').on('click', () => {
        //     bird.get('/api/v1/test', {a:1,b:2}).then(res => console.log(res));
        //     bird.post('/api/v1/test', {a:1,b:2}).then(res => console.log(res));
        // })
        D('.write-area button[type="button"]').on('click', (e: Event) => {
            this.submit();
        })
    }

    submit () {
        let D = this.D;
        let bird = this.bird;

        const data: obj = {
            file_name: D('input[name="file_name"]').val() || this.getRandomNumber(),
            title: D('input[name="title"]').val(),
            author: D('input[name="author"]').val() || '铜方块',
            keywords: this.parseTags(String(D('input[name="keywords"]').val())) || [],
            description: D('input[name="description"]').val() || '无',
            content: D('textarea[name="content"]').val(),
        };
        let created_time = D('input[name="created_time"]').val();
        let updated_time = D('input[name="updated_time"]').val();
        data.created_time = created_time ? new Date(String(created_time)) : new Date();
        data.updated_time = updated_time ? new Date(String(updated_time)) : new Date();

        if (!this.check(data)) {
            alert('请至少填写标题和内容！')
            return false;
        };
        
        bird.post('/api/v1/article', data).then((res) => {
            if (res.code === 0) {
                alert(res.msg);
                return false;
            }
            location.href = '/article/' + data.file_name;
        }).catch(e => console.error(e));
    }

    check (obj: obj) {
        let flag = true;
        for (let x in obj) {
            if (!obj[x]) flag = false;
        }
        return flag;
    }

    getRandomNumber (): number {
        return Math.floor(10000000 * Math.random());
    }

    parseTags (str: string): string[] {
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

new Page();

}