import { createStore } from 'redux';
import HomeScreen from '../screens/HomeScreen';

import {
    addProduct, addMoreAmount, editAmount, deleteProduct, cancelSaleProduct,
    onNestedProduct, onChangeProductDetail,
    addProductToPO, changeAmountProductPO
} from './reducer';

const defaultlState = {
    userInfo: {
        profile: {
            name: 'Lesley', username: 'GirlBoss', password: 'paomart', email: 'girlboss@paomart.com',
            phoneNumber: '+639178391508', role: 'Supreme Ruler'
        },
        roleAccess: {}
    },

    arrProducts: [],

    inventoryProduct: [
        { key: 1, locationInventory: 0, isNestedProduct: false, title: 'Node 1', items: [{ key: 1, name: 'Node 1.1' }, { key: 2, name: 'Node 1.2' }] },
        { key: 2, locationInventory: 1, isNestedProduct: false, title: 'Node 2', items: [{ key: 1, name: 'Node 2.1' }, { key: 2, name: 'Node 2.2' }] },
        { key: 3, locationInventory: 1, isNestedProduct: false, title: 'Node 3', items: [{ key: 1, name: 'Node 3.1' }, { key: 2, name: 'Node 3.2' }] },
    ],
    inventoryProductDetail: [
        { key: 1, keyProduct: 1, keyDetail: 1, name: 'Node 1.1', amount: 100, isFavorite: false },
        { key: 2, keyProduct: 2, keyDetail: 1, name: 'Node 2.1.1', amount: 200, isFavorite: false },
        { key: 6, keyProduct: 2, keyDetail: 1, name: 'Node 2.1.2', amount: 200, isFavorite: true },
        { key: 7, keyProduct: 2, keyDetail: 1, name: 'Node 2.1.3', amount: 200, isFavorite: false },
        { key: 3, keyProduct: 2, keyDetail: 2, name: 'Node 2.2.1', amount: 200, isFavorite: false },
        { key: 4, keyProduct: 3, keyDetail: 1, name: 'Node 3.1', amount: 300, isFavorite: false },
        { key: 5, keyProduct: 3, keyDetail: 2, name: 'Node 3.2', amount: 350, isFavorite: false },
    ],

    purchaseProduct: [
        { key: 1, name: 'Golden Raisin 500g', keyPO: null },
        { key: 2, name: 'Trung Nguyen Instant Black', keyPO: 'PO-001' },
    ],
    purchaseOrder: [
        { key: 'PO-001', status: 'Pick up on Jan 26', listProduct: [{ key: 2, name: 'Trung Nguyen Instant BlacK', amount: 1 }] },
        { key: 'PO-002', status: 'Shipped', listProduct: [] },
        { key: 'PO-003', status: 'Arrived', listProduct: [] },
    ],
};

const reducer = (state = defaultlState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT': return addProduct(state, action.barcode, action.amount, action.price);
        case 'ADD_MORE_AMOUNT': return addMoreAmount(state, action.barcode, action.addAmount);
        case 'EDIT_AMOUNT': return editAmount(state, action.barcode, action.amount);
        case 'DELETE_PRODUCT': return deleteProduct(state, action.barcode);
        case 'CANCEL_SALE_PRODUCT': return cancelSaleProduct(state);

        //inventory tab
        case 'ON_NESTED_PRODUCT': return onNestedProduct(state, action.key);
        case 'ON_CHANGE_PRODUCT_DETAIL': return onChangeProductDetail(state, action.inventoryProductDetail, action.keyProduct, action.keyDetail);
        // case 'UPDATE_INVENTORY_AFTER_TRANSFER': {
        //     //update frominventory
        //     //dataProductToTransfer

        // }

        //purchase tab
        case 'ADD_PRODUCT_TO_PO': return addProductToPO(state, action.keyPO, action.product);
        case 'CHANGE_AMOUNT_PRODUCT_PO': return changeAmountProductPO(state, action.detailPO);
        case 'DELETE_PRODUCT_PO': {
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
        default: break;
    }
    return state;
};

export default store = createStore(reducer); 