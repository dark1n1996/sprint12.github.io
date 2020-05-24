class UserInfo {
    constructor(api) {
        this.api = api;
    }

    setUserInfo(name, job) {
        this.api.setInfo(name, job);
        document.querySelector('.user-info__name').textContent = name;
        document.querySelector('.user-info__job').textContent = job;
        document.querySelector('.popup__change-profile').classList.remove('popup_is-opened');
    }

    updateUserInfo() {
        this.api.getInfo().then(data => {
            document.querySelector('.user-info__name').textContent = data.name;
            document.querySelector('.user-info__job').textContent = data.about;
            document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${data.avatar})`);
        })
        
    }
}