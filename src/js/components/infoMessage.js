export class InfoMessage {
    constructor( popupControl) {        
        this.popupControl = popupControl;
    }

    show(message) {
        const messagePlace = document.querySelector('.popup__content_message');
        const popup = messagePlace.closest('.popup');
        messagePlace.insertAdjacentHTML('beforeend', `<p>${message}</p>`)
        this.popupControl.open(popup);

    }
}