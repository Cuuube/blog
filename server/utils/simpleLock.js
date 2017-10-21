class Lock {
    encryption (string) {
        return string.split('')
            .map(val => val.charCodeAt() + 1)
            .map(val => String.fromCharCode(val))
            .join('');
    }

    decryption (string) {
        return string.split('')
            .map(val => val.charCodeAt() - 1)
            .map(val => String.fromCharCode(val))
            .join('');
    }
    //对字符串进行加密(偷来的函数)
    lock(code){
        code = code.toString();
        var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
        for(var i=1;i<code.length;i++){
            c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
        }
        return escape(c);  
    }
 
    //字符串进行解密
    unlock(code){
        code=unescape(code.toString());
        var c=String.fromCharCode(code.charCodeAt(0)-code.length);
        for(var i=1;i<code.length;i++){
            c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
        }  
        return c;  
    }
}

module.exports = new Lock();