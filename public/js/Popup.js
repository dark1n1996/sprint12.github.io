class Popup {
    constructor() {}

    open(event) {
        if (event.target.classList.contains('user-info__button')) {
            document.querySelector('.popup__add-place').classList.add('popup_is-opened');
        }

        if (event.target.classList.contains('user-info__edit')) {
            document.querySelector('.popup__change-profile').classList.add('popup_is-opened');
        }

        if (event.target.classList.contains('place-card__image')) {
            document.querySelector('.big-card__image').setAttribute('style', `background-image: ${event.target.style.background}`);
            document.querySelector('.big-card').classList.add('big-card_active');
        }
    }

    close(event) {
        if (event.target.classList.contains('popup__close_add-place' || event.key === 'Escape')) {
            document.querySelector('.popup__add-place').classList.remove('popup_is-opened');
        }
        
        if (event.target.classList.contains('popup__close_change-profile') || event.key === 'Escape') {
            document.querySelector('.popup__change-profile').classList.remove('popup_is-opened');
        }

        if (event.target.classList.contains('big-card__close') || event.key === 'Escape') {
            document.querySelector('.big-card').classList.remove('big-card_active');
        }
    }
}