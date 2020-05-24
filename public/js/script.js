(() => {
const placesList = document.querySelector('.places-list');

const validationWords = {
  validationLength: 'Должно быть от 2 до 30 символов',
  requiredText: 'Это обязательное поле',
  requiredLink: 'Здесь должна быть ссылка'
}

const formInfo = document.forms.info;

const formCard = document.forms.new;

const myObj = [];

const authorization = '32e69409-4ce5-4daf-a930-e1c08afa7870';

const config = 'https://praktikum.tk/cohort9/';

const api = new Api (config, authorization);

const cardObj = new Card(api);

const cardListObj = new CardList (document.querySelector('.places-list'), api);

const popupObj = new Popup();

const formValidatorObj = new formValidator(validationWords);

const userInfoObj = new UserInfo (api);

cardListObj.render(cardObj.create);

userInfoObj.updateUserInfo();

formValidatorObj.setEventListeners(document.querySelector('.popup__change-profile'), formValidatorObj);

formValidatorObj.setEventListeners(document.querySelector('.popup__add-place'), formValidatorObj);

document.querySelector('.popup__add-place').addEventListener('submit', function(event) {
  myObj.name = formCard.elements.name.value;
  myObj.link = formCard.elements.link.value;
  myObj.likes = [];
  cardListObj.addCard(cardObj.create(myObj), formCard);
  formCard.reset();
  event.preventDefault();
  document.querySelector('.popup__add-place').classList.remove('popup_is-opened');
});

placesList.addEventListener('click', function(event){
  cardObj.like(event, api);
});

placesList.addEventListener('click', function(event){
  cardObj.remove(event, api);
});

document.querySelector('.user-info__button').addEventListener('click', function(event) {
  popupObj.open(event);
});

document.querySelector('.user-info__edit').addEventListener('click', function(event) {
  popupObj.open(event);
  formInfo.elements.name.value = document.querySelector('.user-info__name').textContent;
  formInfo.elements.job.value = document.querySelector('.user-info__job').textContent;
  document.querySelector('.popup__error_name').textContent = '';
  document.querySelector('.popup__error_job').textContent = '';
  formInfo.querySelector('.button').classList.remove('popup__button_disabled');
});

placesList.addEventListener('click', popupObj.open);

document.querySelector('.popup__close_add-place').addEventListener('click', popupObj.close);

document.querySelector('.popup__close_change-profile').addEventListener('click', popupObj.close);

document.querySelector('.big-card__close').addEventListener('click', popupObj.close);

document.querySelector('.popup__change-profile').addEventListener('submit', function(event) {
    event.preventDefault();
    userInfoObj.setUserInfo(formInfo.elements.name.value, formInfo.elements.job.value);
});

})();