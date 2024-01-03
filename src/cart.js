import localforage from "localforage";

export const cart = {
    products: [],

    addProductToCart: function(productId) {
        if (this.inCart(productId)) {
            let productIndex = this.getIndex(productId);
            this.changeQuantity(productId, this.products[productIndex].quantity + 1);
        } else {
            this.products.unshift({
                id: productId,
                quantity:1,
            })
        }

        this.setCart();
    },
    removeProductFromCart: function(productId) {
        let productIndex = this.getIndex(productId);
        this.products.splice(productIndex, 1);

        this.setCart();
    },
    inCart: function(productId) {
        return this.products.filter(product => product.id === productId).length > 0;
    },
    getIndex: function(productId) {
        return this.products.findIndex(product => product.id === productId);
    },
    changeQuantity: function(productId, newQuantity) {
        let productIndex = this.getIndex(productId);
            this.products[productIndex].quantity = (newQuantity > 0 ? newQuantity : 1);

        this.setCart();
    },
    setCart: function() {
        localforage.setItem("cart", this.products);
    }
}