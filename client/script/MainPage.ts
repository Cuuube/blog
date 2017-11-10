/// <reference path="./utils/bird.ts" />
/// <reference path="./utils/doom.js" />

class MainPage {
    protected D: (any: any) => Doom;
    protected bird: Bird = new Bird();

    constructor () {
        this.D = (sth: any) => Doom.create(sth);
        window.onload = () => {
            this.ready();
        }
    }
    ready () {}
}