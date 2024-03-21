export const calculateTotalQuantity = (products) => {
    const totalQuantity = products.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    return totalQuantity;
}