module.exports = [
    class {
        constructor () {
            this.url = '/';
            this.type = 'get';
        }
        execute (req, res) {
            res.redirect(302,'/article');
            // res.send(123);
        }
    }
]