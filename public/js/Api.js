class Api {
    constructor (config, authorization) {
        this.config = config;
        this.authorization = authorization;
    }
    _request(url, method) {
        return fetch(this.config + url, {
            method,
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
              }  
        })
        .then (res => {
            if (res.ok) {
                return res.json();
        }})
        .catch (err => {
            console.log(err);
        })
    }
    _request2(url, method, name, job) {
        return fetch(this.config + url, {
            method,
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: name,
                about: job
            })    
        })
        .then (res => {
            if (res.ok) {
                return res.json();
        }})
        .catch (err => {
            console.log(err);
        })
    }
    _request3(url, method, name, link) {
        return fetch(this.config + url, {
            method,
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: name,
                link: link
            })    
        })
        .then (res => {
            if (res.ok) {
                return res.json();
        }})
        .catch (err => {
            console.log(err);
        })
    }
    getInfo() {
        return this._request('users/me', 'GET');
    }
    setInfo(name, job) {
        return this._request2('users/me', 'PATCH', name, job);
    }
    getCards() {
        return this._request('cards', 'GET');
    }
    setCards(name, link) {
        return this._request3('cards', 'POST', name, link);
    }
    deleteCard(id) {
        return this._request(`cards/${id}`, 'DELETE');
    }
    like(id){
        return this._request(`cards/like/${id}`, 'PUT');
    }
    unlike(id){
        return this._request(`cards/like/${id}`, 'DELETE')
    }

}