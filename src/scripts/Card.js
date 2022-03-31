
export class Card {
  constructor(item, cardTemplateSelector, handleCardClick) {
    this._template = document.querySelector(cardTemplateSelector).content
    .querySelector('.place').cloneNode(true);
    this._name = item.name
    this._link = item.link
    this._handleCardClick = handleCardClick;
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle('place__like_type_active');
  }

  _handleDeleteCard = () => {
      this._template.remove();
      this._template = null;
  }

  _setEventListeners() {
    this._deleteButton = this._template.querySelector('.place__button_delete')
    this._likeButton.addEventListener('click', this._handleLikeIcon);
    this._deleteButton.addEventListener('click', this._handleDeleteCard);
    this._newImage.addEventListener('click', () => {this._handleCardClick(this._name,this._link);
  });
}

    renderinitialCards = () => {
        this._likeButton = this._template.querySelector('.place__button_like')
        this._newImage = this._template.querySelector('.place__picture_link')
        this._template.querySelector('.place__picture_name').textContent = this._name;
        this._newImage.src = this._link;
        this._newImage.alt = this._name;
        this._setEventListeners()

        return this._template
      }
}