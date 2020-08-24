export class MenuControl {
    constructor(menu) {
        this.menu = menu;
    }

    _menuCurPosition(menu) {
        return menu.getBoundingClientRect();
    }

    open() {
        const pos = this._menuCurPosition(this.menu);

        console.log(pos);

        this.menu.style.height = `calc(100vh - ${pos.top}px)`
    }

    hide() {
        const textList = this.menu.querySelectorAll('.popup-menu__text');
        const closeIcon = this.menu.querySelector('.popup-menu__close-icon');

        for (const text of textList) {
            text.classList.remove('popup-menu__text_is-visible');
        }
        closeIcon.classList.remove('popup-menu__close-icon_is-visible');
        this.menu.style.width = '50px';
        this.menu.style.transition = '0.3s'


    }

    show() {
        const textList = this.menu.querySelectorAll('.popup-menu__text');
        const closeIcon = this.menu.querySelector('.popup-menu__close-icon');

        for (const text of textList) {
            text.classList.add('popup-menu__text_is-visible');
        }
        closeIcon.classList.add('popup-menu__close-icon_is-visible');
        this.menu.style.width = '300px';
        this.menu.style.transition = '0.3s'


    }







}