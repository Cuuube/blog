const md = require('marked');
md.setOptions({
    renderer: new md.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
})
console.log(md(`123
# h1
## h2
### h3
#### h4
##### h5
###### h6
* ulli
* ulli2
1. 123
2. 456
 * 111
 * 222
ddsafa\n
\`\`\`javascript
alert('a')
\`\`\`
**asd**`));