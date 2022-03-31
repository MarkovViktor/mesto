
export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items,
        this._renderer = renderer,
        this._сontainer = document.querySelector(containerSelector);
    }

    renderPlace() {
        this._items.forEach((data) => {
            this._renderer(data, this._сontainer)
        })
    }

    addItem(element) {
        this._сontainer.prepend(element);
    }
}