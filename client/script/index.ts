/// <reference path="./MainPage.ts" />

{
    class Page extends MainPage {
        constructor () {
            super();
        }
        
        ready () {
            let D = this.D;
    
            D('.login').on('click', () => {
                location.href = '/login';
            })
        }
    }
    
    new Page();
}

