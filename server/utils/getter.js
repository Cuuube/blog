module.exports = class {
    constructor (origin) {
        this.origin = origin;
        this.axios = require('axios');
    }
    get (url, data) {
        url = this.addOrigin(url);
        let _url = url + this.param(data);
        return this.axios.get(_url);
    }
    post (url, data) {
        url = this.addOrigin(url);        
        return this.axios.post(url, data);
    }
    put (url, data) {
        url = this.addOrigin(url);        
        return this.axios.put(url, data);
    }
    delete (url, data) {
        url = this.addOrigin(url);
        return this.axios.delete(url, data);
    }
    addOrigin(url) {
        if (!!this.origin) {
            return this.origin + url;
        } else {
            return url;
        }
    }
    param (obj) {
        let str = '?';
        for ( let x in obj) {
            str = str + x + '=' + obj[x];
        }
        return str;
    }

};