import axios from 'axios';
import { AxiosInstance, AxiosPromise } from 'axios';


export class Bird {
    private origin: string;
    private axios: AxiosInstance = axios;

    constructor (origin: string) {
        this.origin = origin;
    }

    get (url: string, data?: obj): AxiosPromise {
        url = this.addOrigin(url);
        let _url = data !== undefined ? url + this.param(data) : url;

        return this.axios.get(_url);
    }

    post (url: string, data?: object): AxiosPromise {
        url = this.addOrigin(url);      

        return this.axios.post(url, data);
    }

    put (url: string, data?: object): AxiosPromise {
        url = this.addOrigin(url);      

        return this.axios.put(url, data);
    }

    delete (url: string, data?: object): AxiosPromise {
        url = this.addOrigin(url);

        return this.axios.delete(url, data);
    }

    addOrigin(url: string) {
        if (!!this.origin) {
            return this.origin + url;
        } else {
            return url;
        }
    }

    param (object: obj): string {
        let str = '?';
        for ( let x in object) {
            str = str + x + '=' + object[x] + '&';
        }

        return str.substr(0, str.length - 1);
    }

};