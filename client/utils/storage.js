class Storage {
    constructor (window) {
        this.localStorage = window.localStorage ? window.localStorage : alert('此浏览器不支持Storage!');
        this.sessionStorage = window.sessionStorage ? window.sessionStorage : alert('此浏览器不支持Storage!');
    }
    local (key, value) {
        if ( key !== undefined && value !== undefined ) {
            this.localStorage.setItem(key, value);
            return this;
        } else if ( key !== undefined && value === undefined) {
            return this.localStorage.getItem(key);
        } else {
            return this.localStorage;
        }
    }
    session (key, value) {
        if ( key !== undefined && value !== undefined ) {
            this.sessionStorage.setItem(key, value);
            return this;
        } else if ( key !== undefined && value === undefined) {
            return this.sessionStorage.getItem(key);
        } else {
            return this.sessionStorage;
        }
        return this;
    }
    remove (storageName, value) {
        if (value !== undefined) {
            switch (storageName) {
                case 'local': 
                    this.localStorage.removeItem(value);
                    break;
                case 'session': 
                    this.sessionStorage.removeItem(value);
                    break;
                default:
            }
        } else {
            switch (storageName) {
                case 'local': 
                    this.localStorage.clear();
                    break;
                case 'session': 
                    this.sessionStorage.clear();
                    break;
                default:
            }
        }
        return this;
    }
    clear (storageName) {
        switch (storageName) {
            case 'local': 
                this.localStorage.clear();
                break;
            case 'session': 
                this.sessionStorage.clear();
                break;
            default:
        }
        return this;
    }
    localRemove (key) {
        this.localStorage.removeItem(key);
    }
    sessionRemove (key) {
        this.sessionStorage.removeItem(key);        
    }
}

module.exports = new Storage(window);
