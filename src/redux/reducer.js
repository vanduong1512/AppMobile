export const addProduct = (state, barcode, amount, price) => {
    var product = [{
        barcode: barcode, amount: amount,
        isDelete: false, price: price
    }];
    return { arrProducts: product.concat(state.arrProducts) };
}

export const addMoreAmount = (state, barcode, addAmount) => {
    return {
        ...state,
        arrProducts: state.arrProducts.map(e => {
            if (e.barcode === barcode)
                return { ...e, amount: (e.amount + addAmount) };
            return e;
        })
    };
}

export const editAmount = (state, barcode, amount) => {
    return {
        ...state,
        arrProducts: state.arrProducts.map(e => {
            if (e.barcode === barcode)
                return { ...e, amount: (amount !== undefined ? amount : 1) };
            return e;
        })
    }
}

export const deleteProduct = (state, barcode) => {
    return {
        ...state,
        arrProducts: state.arrProducts.filter(e => {
            return (e.barcode !== barcode);
        })
    }
}

export const cancelSaleProduct = (state) => {
    return {
        ...state,
        arrProducts: []
    }
}

//INVENTORY tab
export const onNestedProduct = (state, key) => {
    return {
        ...state,
        inventoryProduct: state.inventoryProduct.map(e => {
            if (e.key === key) {
                return { ...e, isNestedProduct: !e.isNestedProduct }
            }
            return e;
        })
    }
}

export const onChangeProductDetail = (state, inventoryProductDetail, keyProduct, keyDetail) => {
    var inventoryNotEdit = state.inventoryProductDetail.filter(eFilter => {
        return (!(eFilter.keyProduct === keyProduct && eFilter.keyDetail === keyDetail))
    });
    return {
        ...state,
        inventoryProductDetail: inventoryNotEdit.concat(inventoryProductDetail),
    }
}

export const addProductToPO = (state, keyPO, product) => {
    return {
        ...state,
        purchaseOrder: state.purchaseOrder.map(e => {
            if (e.key === keyPO) {
                var product = [{ key: product.key, name: product.name, amount: 1 }];
                return { ...e, listProduct: product.concat(e.listProduct) };
            }
            return e;
        }),
        purchaseProduct: state.purchaseProduct.map(e => {
            if (e.key === product.key)
                return { ...e, keyPO: keyPO };
            return e;
        })
    }
}

export const changeAmountProductPO = (state, detailPO) => {
    return {
        ...state,
        purchaseOrder: state.purchaseOrder.map(e => {
            if (e.key === detailPO.key) {
                var listProduct = e.listProduct;
                detailPO.listProduct.forEach(detail => {
                    listProduct = listProduct.map(p => {
                        if (detail.key === p.key) {
                            return { ...p, amount: detail.amount };
                        }
                        return p;
                    })
                })
                return { ...e, listProduct }
            }
            return e;
        })
    }
}

export const deleteProductPO = (state, keyPO, keyProduct) => {
    return {
        ...state,
        purchaseOrder: state.purchaseOrder.map(e => {
            if (e.key === action.keyPO) {
                var listProduct = e.listProduct.filter(product => {
                    return (!(product.key === action.keyProduct));
                })
                return { ...e, listProduct }
            }
            return e;
        }),
        purchaseProduct: state.purchaseProduct.map(e => {
            if (e.key === action.keyProduct)
                return { ...e, keyPO: null }
            return e;
        })
    }
}