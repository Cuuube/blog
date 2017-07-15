(() => {
    class Getter {
        constructor() {
            if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                this.xmlhttp = new XMLHttpRequest();
            } else { // code for IE6, IE5
                this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        get(url, data) {
            const self = this;
            return new Promise((resolve, reject) => {
                let _url = url + self.parseData(data, true);
                self.xmlhttp.onreadystatechange = function () {
                    if (self.xmlhttp.readyState == 4 && self.xmlhttp.status == 200) {
                        resolve(xmlhttp.responseText);
                    } else {
                        reject(new Error('Ajax error!'))
                    }
                }
                self.xmlhttp.open("GET", _url, true);
                self.xmlhttp.send();
            })
        }
        post(url, data) {
            const self = this;
            return new Promise((resolve, reject) => {
                let xmlhttp = self.xmlhttp;
                let _url = url;
                try {
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            resolve(xmlhttp.responseText);
                        }
                    }
                    xmlhttp.open("POST", _url, true);
                    xmlhttp.setRequestHeader("Content-type","application/json");
                    xmlhttp.send(JSON.stringify(data));
                } catch (e) {
                    reject(e);
                }
            })
        }
        postFormdata(url, data) { //有问题
            const self = this;
            return new Promise((resolve, reject) => {
                let xmlhttp = self.xmlhttp;
                let _url = url;
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        resolve(xmlhttp.responseText);
                    } else {
                        reject(new Error('Ajax error!'))
                    }
                }
                xmlhttp.open("POST", _url, true);
                xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xmlhttp.send(self.createFormData(data));
            })
        }
        parseData(obj, isGet) {
            let str = isGet ? '?' : '';
            for (let x in obj) {
                str = str + x + '=' + obj[x] + '&';
            }
            return str.substr(0, str.length - 1);
        }
        createFormData(obj) {
            let formdata = new FormData();
            // 往formdata中添加文件,另一种formdata方式：
            // let data = new FormData($('form')[0]);
            // data.append('upload',$('input[type=file]')[0].files[0]);
            // 添加其他信息
            for (let x in obj) {
                if (x instanceof Array) {
                    x.forEach(val => formdata.append(x, val));
                } else {
                    formdata.append(x, obj[x]);
                }
            }
            return formdata;
            // 如果想添加多个该信息，不能直接跟数组，而是多次为该键append数据
            // data.append('imgTitle', 'data2';
            // data.append('imgTitle', 'data3');
        }
    }

    const getter = new Getter();

    document.querySelector('.write-area button[type="button"]').addEventListener('click', (e) => {
        submit();
    })

    function submit() {
        const data = {
            file_name: document.querySelector('input[name="file_name"]').value || getRandomNumber(),
            title: document.querySelector('input[name="title"]').value || 'No title',
            author: document.querySelector('input[name="author"]').value || '铜方块',
            keywords: parseTags(document.querySelector('input[name="keywords"]').value) || [],
            description: document.querySelector('input[name="description"]').value,
            content: document.querySelector('textarea[name="content"]').value
        };
        console.log(data);
        getter.post('/api/article', data).then((res) => {
            console.log(res);
        }).catch(e => console.error(e));
    }

    function getRandomNumber() {
        return Math.floor(10000000 * Math.random());
    }

    function parseTags(str) {
        let arr = str.split(',')
            .map((val) => val.replace(/^\s+|\s+$/g, ''))
            .filter((val) => (val !== '') ? true : false);
        if (arr[0] === '') {
            return [];
        } else {
            return arr;
        }
    }

})();