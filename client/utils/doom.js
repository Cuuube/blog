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
        if (selector === null || selector === undefined) {
            return ;
        }
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
        } else if (selector.length > 0 && selector[0] instanceof Element) {
            for (let x in selector) {
                if (!isNaN(parseInt(x))) {
                    this[x] = selector[x];
                }
            }
            this.length = selector.length;
        } else {
            console.warn('Unexcept type!');
            this.length = 0;
        }
        
    }

// 设置
    static label (str) { //设置生成对象的函数
        if (!str || typeof str !== 'string') {
            console.log(new Error('Must have one param or invalid param.'))
        } else {
            window[str] = (sth) => {
                if (typeof sth === 'string' && sth[0] === '<') {
                    // 需求： 输入一段html，输出html元素的Doom对象
                    // let tag = sth.match(/^<[^<>\s&'"]+>/)[0].replace('<', '').replace('>', '');
                    //let newEle = document.createElement(tag);
                    //newEle.outerHTML = sth;
                    //return new Doom(document.createElement(sth));
                    // 正则不会，曲线救国：
                    let ele = document.createElement('div');
                    ele.innerHTML = sth;
                    ele = ele.childNodes[0];
                    return new Doom(ele);
                } else {
                    return new Doom(sth);
                }
            }
            return str;
        }
    }
    static create (sth) {
        return new Doom(sth);
    }

// 遍历方法
    all (callback = val => val) {   // 参数为dom元素，输出为this
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i);
        }
        return this;
    }

    filter (fn = () => true) { // 参数为dom元素，输出为Doom对象
        const resultArray = [];
        for (let i = 0; i < this.length; i++) {
            let result = fn(this[i], i);
            !!result ? resultArray.push(this[i]) : false;
        }
        return new Doom(resultArray);
    }

    // 输出数组
    map (fn = (val) => val) { // 参数为dom元素，输出为dom元素的数组
        const array = Array.from(this);
        return array.map(fn);
    }

// 节点dom操作
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

    empty () {
        this[0].innerHTML = '';
        return this;
    }
    addClass (string) {
        this.all((val) => {
            try {
                val.classList.add(string);
            } catch (e) {}
        });
        return this;
    }
    removeClass (string) {
        this.all((val) => {
            try {
                val.classList.remove(string);  
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
    offset (where) {
        let _where = where[0].toUpperCase() + where.substr(1);
        return this[0]['offset' + _where]
    }
    
    scroll (where) {
        let _where = where[0].toUpperCase() + where.substr(1);
        return this[0]['scroll' + _where]
    }

//  节点dom遍历
    append (element) { // 尾部插入
        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                this.all(val => {
                    val.appendChild(element[i]);
                })
            }
        } else {
            this.all(val => {
                val.appendChild(element);
            })
        }
        
        return this;
    }
    prepend (element) { // 头部插入
        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                this.all(val => {
                    val.insertBefore(element[i], val.firstChild);
                })
            }
        } else {
            this.all(val => {
                val.insertBefore(element, val.firstChild);
            })
        }
        return this;
    }
    // before和after获得前面或后面节点时有bug。获得到了文本节点而不是元素节点。
    after (element) { // 身后插入
        if (element === undefined) {
            return new Doom(this[0].nextElementSibling);// ceshi
        } else {
            if (element.length > 0) {
                for (let i = 0; i < element.length; i++) {
                    this.all(val => {
                        val.parentNode.appendChild(element[i]);
                    })
                }
            } else {
                this.all(val => {
                    val.parentNode.appendChild(element);
                })
            }
        }
        return this;
    }
    before (element) { // 前面插入
        if (element === undefined) {
            return new Doom(this[0].previousElementSibling);//ceshi
        } else {
            if (element.length > 0) {
                for (let i = 0; i < element.length; i++) {
                    this.all(val => {
                        val.parentNode.insertBefore(element[i], val);
                    })
                }
            } else {
                this.all(val => {
                    val.parentNode.insertBefore(element, val);
                })
            }
            
            return this;
        }
    }
    first () {
        return new Doom(this[0].firstElementChild);
    }
    last () {
        return new Doom(this[0].lastElementChild);
    }
    root () {
        return new Doom(this[0].ownerDocument);
    }
    parent () {
        return new Doom(this[0].parentNode);
    }
    children() {
        return new Doom(this[0].children);
    }
    
// data属性操作
    data (dataName, value) {
        if (!dataName) {
            return this[0].dataset;
        } else if (!value) {
            return this[0].dataset[dataName];
        } else {
            this.all(val => {
                val.dataset[dataName] = value;
            })
            return this;
        }
    }

// 样式操作
    style (key, value) { // 得到内联style中的值，可设置
        if (typeof key === 'string' && value !== undefined) {
            this.all(val => {
                val.style[key] = value;
            });
        } else if (typeof key === 'string' && value === undefined){
            return this[0] ? this[0].style[key] : false;
        } else if (typeof key === 'object') {
            this.all(val => {
                for (let x in key) {
                    val.style[x] = key[x];
                }
            })
        }
        
        return this;
    }
    css (key, value) { // 得到计算后的css数值，只读
        value !== undefined ? console.log(new Error('css is readonly')) : false;
        if (key) {
            return document.defaultView.getComputedStyle(this[0])[key];
        } else {
            return document.defaultView.getComputedStyle(this[0]);
        }
    }

    
}

// module.exports = sth => new Doom(sth);
Doom.label('D');