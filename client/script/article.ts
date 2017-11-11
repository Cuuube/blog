/// <reference path="./MainPage.ts" />

{
    class Page extends MainPage {
        constructor () {
            super();
        }
        
        ready () {
            let D = this.D;
            
            D('.to-top').on('click', () => {
                window.scroll(0, 0);
            })
        }
    }
    
    new Page();
}


