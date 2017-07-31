/**
 * 取得节点
 * innerHTML操作，innerText操作，value操作
 * class操作，addClass,removeClass
 * 属性操作，attr，removeAttr
 * 绑定事件
 * 
 * 插入元素，append，prepend，before，after
 * 获得身前元素，身后元素，第一个子元素，最后一个子元素
 * 遍历元素，获得子节点、父节点、兄弟节点
 * 
 * css操作，style操作，得到宽高位置等
 * 加入data的解析
 * 
 */




class Doom {
    constructor (selector) {
        if (selector instanceof Document) {
            this[0] = document;
            this.length = 1;
        } else if (typeof selector === 'function') {
            window.onload = selector;
        } else  if (typeof selector === 'string') {
            var __ele = window.document.querySelectorAll(selector);
            // if (__ele.length === 0) {
            //     __ele = __ele[0];
            // }
            this.length = __ele.length;
            for (let i = 0; i < this.length; i++) {
                this[i] = __ele[i];
            }
        } else if (selector instanceof Element){
            this[0] = selector;
            this.length = 1;
        } else if (selector.length > 0) {
            for (let x in selector) {
                this[x] = selector[x];
            }
        } else {
            console.warn('Unexcept type!');
        }
        
    }
    all (callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i]);
        }
    }

    html (string) {
        if (string !== undefined) {
            this.all((val) => val.innerHTML = string);
            return this;
        } else {
            return this[0].innerHTML;
        }
    }
    text (string) {
        if (string !== undefined) {
            this.all((val) => val.innerText = string);
            return this;
        } else {
            return this[0].innerText;
        }
    }
    val(string) {
        if (string !== undefined) {
            this.all((val) => {
                try {
                    val.value = string;
                } catch (e) {}
            });
            return this;
        } else {
            return this[0].value;
        }
              
    }

    addClass (string) {
        this.all((val) => {
            try {
                let __oldClassName = val.className;
                val.className = __oldClassName + ' ' + string;
            } catch (e) {}
        });
        return this;
    }
    removeClass (string) {
        this.all((val) => {
            try {
                let __oldClassName = val.className;
                if (__oldClassName.match(val)) {
                    val.className = __oldClassName.replace(string, '');
                }
            } catch (e) {}
        });
        return this;
    }

    id (string) {
        if (string !== undefined) {
            this[0].id = string;
            return this;
        } else {
            return this[0].id;
        }
    }

    attr (attrName, attrValue) {
        try {
            if (attrValue !== undefined) {
                this[0].setAttribute(attrName, attrValue);
                return this;
            } else {
                return this[0].getAttribute(attrName);
            }
        } catch (e) {}
    }
    removeAttr (attrName) {
        try {
            this[0].removeAttribute(attrName);
        } catch (e) {}
        return this;
    }

    on (eventName, callback) {
        this.all(val => {
            val.addEventListener(eventName, callback);
        })
        return this;
    }
    off (eventName, callback) {
        this.all(val => {
            val.removeEventListener(eventName, callback);
        })
        return this;
    }

    append (element) {
        // if (element instanceof Doom || (element instanceof NodeList)) {
        //     element = element[0];
        // }
        if (element.length > 1) {
            element = element[0];
        }
        this.all(val => {
            val.appendChild(element);
        })
        return this;
    }
    prepend (element) {
        // if (element instanceof Doom || (element instanceof NodeList)) {
        //     element = element[0];
        // }
        if (element.length >= 1) {
            element = element[0];
        }
        this.all(val => {
            val.insertBefore(element, val.firstChild);
        })
        return this;
    }
    // before和after获得前面或后面节点时有bug。获得到了文本节点而不是元素节点。
    after (element) {
        if (element === undefined) {
            return this[0].nextSibling;
        } else {
            if (element.length >= 1) {
                element = element[0];
            }
            this.all(val => {
                val.parentNode.insertBefore(element, val.nextSibling);
            })
        }
        return this;
    }
    before (element) {
        if (element === undefined) {
            return this[0].previousSibling;
        } else {
            if (element.length >= 1) {
                element = element[0];
            }
            this.all(val => {
                val.parentNode.insertBefore(element, val);
            })
            return this;
        }
    }
    first () {
        return this[0].firstChild;
    }
    last () {
        return this[0].lastChild;
    }
    root () {
        return this[0].ownerDocument;
    }
    parent () {
        return this[0].parentNode;
    }
    children() {
        return this[0].children;
    }
    
    empty () {
        this[0].innerHTML = '';
        return this;
    }
    
}

module.exports = sth => new Doom(sth);