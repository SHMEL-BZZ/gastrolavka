import {makeAutoObservable} from "mobx";

export default  class DishStore {
    constructor() {
        this._categories = []
        this._dishes = [];
        this._page = 1
        this._totalCount = 0
        this._limit = 21
        this._selectedCategory = {}
        makeAutoObservable(this);
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
    }

    setCategories (categories) {
        this._categories = categories;
    }

    setDishes (dishes) {
        this._dishes = dishes;
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get categories() {
        return this._categories;
    }
    get dishes(){
        return this._dishes;
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}