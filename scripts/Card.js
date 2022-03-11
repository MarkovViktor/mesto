
export class Card {
  constructor(item, cardTemplateSelector, handleCardClick) { //'.element__template'
    this._template = document.querySelector(cardTemplateSelector).content;
    this._name = item.name
    this._link = item.link
    this._handleCardClick = handleCardClick;
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle('place__like_type_active');
  }

  _handleDeleteCard = (evt) => {
      evt.target.closest('.place').remove();
  }

  _setEventListeners() {
    this._deleteButton = this._newElement.querySelector('.place__button_delete')
    this._likeButton.addEventListener('click', this._handleLikeIcon);
    this._deleteButton.addEventListener('click', this._handleDeleteCard);
    this._newImage.addEventListener('click', () => {this._handleCardClick(this._name,this._link);
  });
}

    renderinitialCards() {
        this._newElement = this._template.cloneNode(true);
        this._likeButton = this._newElement.querySelector('.place__button_like')
        this._newImage = this._newElement.querySelector('.place__picture_link')
        this._newElement.querySelector('.place__picture_name').textContent = this._name;
        this._newImage.src = this._link;
        this._newImage.alt = this._name;
        this._setEventListeners()

        return this._newElement
      }
}