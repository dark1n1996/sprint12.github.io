class CardList {
    constructor(container, api) {
        this.container = container;
        this.api = api;
    }

    addCard (data, form) {
        this.api.setCards(form.elements.name.value, form.elements.link.value).then(rez =>{
            this.container.insertAdjacentHTML('beforeend', data);
        });
        
      }

    render (create) {
        this.api.getCards().then(data => {
            for (let piece of data) {
                this.container.insertAdjacentHTML('beforeend', create(piece));
            }
        })  
    }
}
