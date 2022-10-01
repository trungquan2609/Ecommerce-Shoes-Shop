module.exports = function cart(oldCart) {
    this.items = oldCart.items || {} ;
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, qty, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0}
        }
            storedItem.qty += qty;
            storedItem.price = storedItem.item.currentPrice * storedItem.qty;
            this.totalQty += qty;
            this.totalPrice += storedItem.item.currentPrice * qty;
            storedItem.item = item
    }

    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};