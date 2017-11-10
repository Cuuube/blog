import * as crypto from 'crypto';

class Lock {

    encryption (string: string): string {
        return string.split('')
            .map(val => val.charCodeAt(0) + 1)
            .map(val => String.fromCharCode(val))
            .join('');
    }

    decryption (string: string): string {
        return string.split('')
            .map(val => val.charCodeAt(0) - 1)
            .map(val => String.fromCharCode(val))
            .join('');
    }

    //对字符串进行加密(偷来的函数)
    lock (code: string): string{
        code = code.toString();
        var c = String.fromCharCode(code.charCodeAt(0) + code.length);  
        for(var i = 1; i < code.length; i++ ) {
            c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
        }
        return global.escape(c);  
    }
 
    //字符串进行解密
    unlock (code: string): string {
        code = global.unescape(code.toString());
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for(var i = 1; i < code.length; i++){
            c += String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
        }  
        return c;  
    }
}

export default new Lock();