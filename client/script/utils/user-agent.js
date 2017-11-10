class UserAgent {
    constructor (window) {
        this.agent = window.navigator.userAgent;
        this.pattern = {
            "mobile": new RegExp("mobile", 'ig'),
            "iphone": new RegExp("iPhone", 'i'),
            "iPad": new RegExp("iPad", 'i'),
            "ipad": new RegExp("iPad", 'i'),
            "iPod": new RegExp("iPod", 'i'),
            "ipod": new RegExp("iPod", 'i'),
            "mini": new RegExp("mini", 'i'),
            "android": new RegExp("android", 'i'),
            "360": new RegExp("360\s+Aphone\s+Browser", 'i'),
            "baidu": new RegExp("baidubrowser", 'i'),
            "uc": new RegExp("UCBrowser", 'i'),
            "dolphin": new RegExp("DolphinBrowserCN", 'i'),
            "sougou": new RegExp("SogouMobileBrowser", 'i'),
            "lenovo": new RegExp("Lenovo-", 'i'),
            "opera": new RegExp("OPR", 'i'),
            "chrome": new RegExp("chrome", 'i'),
            "firefox": new RegExp("FireFox", 'i'),
            "qq": new RegExp("MQQBrowser", 'i'),
            "nokia": new RegExp("NokiaBrowser", 'i'),
            "Symbian": new RegExp("Symbian", 'i'),
            "symbian": new RegExp("Symbian", 'i'),
            "windowsphone": new RegExp("Windows\s+Phone|w7|w8", 'i'),
            "windowsweixin": new RegExp("WindowsWechat", 'i'),
            "mobileweixin": new RegExp("micromessenger", 'i')
        }
    }
    is (str) {
        let result;
        str = str.toLowerCase();
        try {
            result = this.pattern[str].test(this.agent);
        } catch (e) {
            throw new Error(str + ' is invalid parameter.')
        }
        return this.pattern[str].test(this.agent);
    }
}

// module.exports = new UserAgent(window);