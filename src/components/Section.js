
export class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer,
        this._сontainer = document.querySelector(containerSelector);
    }

    renderPlace(items) {
        this._items = items,
        this._items.forEach((data) => {
            this._renderer(data, this._сontainer)
        })
    }

    addItem(element) {
        this._сontainer.prepend(element);
    }
}