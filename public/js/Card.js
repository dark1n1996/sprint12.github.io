class Card {
    constructor(api) {
        this.api = api;
    }
    like(event, api) {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
            event.target.classList.toggle('place-card__like-icon_unliked'); 
        }
        // Как правильно привязать контекст???
        if (event.target.classList.contains('place-card__like-icon_liked')){
            api.like(event.target.getAttribute('name')).then(data =>{
            event.target.closest('div').querySelector('.place-card__likes').textContent = data.likes.length;
            });
        }
        if (event.target.classList.contains('place-card__like-icon_unliked')) {
            api.unlike(event.target.getAttribute('name')).then(data =>{
            event.target.closest('div').querySelector('.place-card__likes').textContent = data.likes.length;
            });
        }
    }

    remove(event, api) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            window.confirm("Вы действительно хотите удалить эту карточку?")
            document.querySelector('.places-list').removeChild(event.target.closest('.place-card'));
            api.deleteCard(event.target.getAttribute('name'));
        }
    }

    create(dataValue) {
        const template = `<div class="place-card">
        <div class="place-card__image" style="background: url(${dataValue.link})">
        <button class="place-card__delete-icon" name="${dataValue._id}"></button>
        </div>
        <div class="place-card__description">
        <h3 class="place-card__name">${dataValue.name}</h3>
        <div class="place-card__like-group">
        <button class="place-card__like-icon place-card__like-icon_unliked" name="${dataValue._id}"></button>
        <div class="place-card__likes">${dataValue.likes.length}</div>
        </div>
        </div>
    </div>`
    return template;
    }
}