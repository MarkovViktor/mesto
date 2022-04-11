
  
export class Card {
  constructor(item, cardTemplateSelector, handleCardClick,  handleDeleteClick, handleLikeClick) {
    this._template = document.querySelector(cardTemplateSelector).content
    .querySelector('.place').cloneNode(true);
    this._name = item.name
    this._link = item.link
    this._likes = item.likes
    this._id = item.id
    this._userId = item.userId
    this._ownerId = item.ownerId
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick

  }

  // _handleLikeIcon = () => {
  //   this._likeButton.classList.toggle('place__like_type_active');
  // }

  _fillLike = () => {
    this._likeButton.classList.add('place__like_type_active');
  }

  _unfillLike = () => {
    this._likeButton.classList.remove('place__like_type_active');
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId)
 
    return userHasLikedCard
  }

  deleteCard = () => {
      this._template.remove();
      this._template = null;
  }

  _setEventListeners() {
    this._deleteButton = this._template.querySelector('.place__button_delete')
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));
    this._newImage.addEventListener('click', () => {this._handleCardClick(this._name,this._link);
  });
  }

  setLikes(newLikes) {
    this._likes = newLikes
    const likeCountElement = this._template.querySelector('.place__like-count')
    likeCountElement.textContent = this._likes.length

    if(this.isLiked()) {
      this._fillLike()
    } else {
      this._unfillLike()
    }
  }

    renderinitialCards = () => {
        this._likeButton = this._template.querySelector('.place__button_like')
        this._newImage = this._template.querySelector('.place__picture_link')
        this._template.querySelector('.place__picture_name').textContent = this._name;
        this._newImage.src = this._link;
        this._newImage.alt = this._name;
        this._setEventListeners()

        this.setLikes(this._likes)
        if(this._ownerId !== this._userId) {
          this._template.querySelector('.place__button_delete').style.display = 'none'
        }
        return this._template
      }
}