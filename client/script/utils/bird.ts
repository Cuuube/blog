class Bird {
    constructor() {
        // this.xmlhttp = this.createXHR();
    }
    
    createXHR() {
        let xmlhttp;
        if (XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;
    }

    get (url: string, data: object): Promise<any> {
        const self = this;
        return new Promise((resolve, reject) => {
            const xmlhttp = this.createXHR();
            const _url = url + self.parseData(data, true);
            try {
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        let result: any;
                        try {
                            result = JSON.parse(xmlhttp.responseText)
                        } catch (e) {
                            result = xmlhttp.responseText;
                        }
                        resolve(result);
                    }
                }
                xmlhttp.open("GET", _url, true);
                xmlhttp.send();
            } catch (e) {
                reject(e);
            }
        })
    }

    post (url: string, data: object): Promise<any> {
        return new Promise((resolve, reject) => {
            const xmlhttp = this.createXHR();
            const _url = url;
            try {
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        let result;
                        try {
                            result = JSON.parse(xmlhttp.responseText)
                        } catch (e) {
                            result = xmlhttp.responseText;
                        }
                        resolve(result);
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

    postFormdata (url: string, data: object): Promise<any> { //有问题
        const self = this;
        return new Promise((resolve, reject) => {
            let xmlhttp = this.createXHR();
            let _url = url;
            try {
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        let result;
                        try {
                            result = JSON.parse(xmlhttp.responseText)
                        } catch (e) {
                            result = xmlhttp.responseText;
                        }
                        resolve(result);
                    }
                }
                xmlhttp.open("POST", _url, true);
                xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xmlhttp.send(self.createFormData(data));
            } catch (e) {
                reject(e);
            }
        })
    }

    parseData(obj: obj, isGet?: boolean) {
        // 有bug。对数组处理错误。数组b=[1,2]应被解析为：?b[0]=1&b[1]=2
        let str = isGet ? '?' : '';
        for (let key of Object.keys(obj)) {
            str = str + key + '=' + obj[key] + '&';
        }
        return str.substr(0, str.length - 1);
    }

    // __parseData(obj: obj, isGet?: boolean) {
    //     // 写完整版的parse
    //     let str = isGet ? '?' : '';
    //     for (let x in obj) {
    //         if (obj[x] instanceof Array || obj[x] instanceof Object) {
    //             str = str + _parseObj(obj[x]) + '&';
    //         }
    //         str = str + x + '=' + obj[x] + '&';
    //     }
    //     console.log(str);
    //     return str.substr(0, str.length - 1);

    //     function _parseObj(data: obj, key: string | number) {
    //         let str;
    //         if (data instanceof Array || data instanceof Object) {
    //             for (let x in data) {
    //                 str = str+`${key}[${x}]=${_parseObj(data[x])}`
    //             }
    //         } else {
    //             str = str + key + '=' + data + '&';
    //         }
    //     }
    // }

    createFormData(obj: obj) {
        let formdata = new FormData();
        // 往formdata中添加文件,另一种formdata方式：
        // let data = new FormData($('form')[0]);
        // data.append('upload',$('input[type=file]')[0].files[0]);
        // 添加其他信息
        for (let key of Object.keys(obj)) {
            if (obj[key] instanceof Array) {
                obj[key].forEach((val: any) => formdata.append(key, val));
            } else {
                formdata.append(key, obj[key]);
            }
        }
        return formdata;
        // 如果想添加多个该信息，不能直接跟数组，而是多次为该键append数据
        // data.append('imgTitle', 'data2';
        // data.append('imgTitle', 'data3');
    }

    jsonp(url: string, config: obj, callback: Function) {
        let cbName = 'callback';        
        let script = document.createElement('script');
        if (!config) {
            url += '?callback=' + cbName;
        } else if (!!config && !config.callback) {
            config.callback = cbName;
            url = url + this.parseData(config, true);
        } else {
            cbName = config.callback;
            url = url + this.parseData(config, true);         
        }
        script.src = url;
        document.body.appendChild(script); 
        script.onload = function (e: Event) {
            (<window>window)[cbName] = null;
            document.body.removeChild(<Node>e.target);
        }
        script.onerror = function (e: Event) {
            (<window>window)[cbName] = null;
            document.body.removeChild(<Node>e.target);
        }
        
        return new Promise((resolve, reject) => {
            try {
                (<window>window)[cbName] = function (res: any) {
                    resolve(res);
                }
            } catch (e) {
                reject(e);
            }
        })
    }
}
