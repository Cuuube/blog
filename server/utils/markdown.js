module.exports = (() => {
    const markdown = require('marked');
    markdown.setOptions({
        renderer: new markdown.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    })
    return markdown;
})()