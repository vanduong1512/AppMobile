import { StackNavigator, NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/ScannerScreen';
import LoginScreen from './screens/LoginScreen';

import SaleTab from './components/SaleTab/Products';
import SaleDetail from './components/SaleTab/SaleDetails';
import ListSaled from './components/SaleTab/Sales';

import BalanceTab from './components/BalanceTab/Balance';
import AddBalanceTab from './components/BalanceTab/AddBalance';

import InventoryTab from './components/InventoryTab/Inventory';
import InventoryTransferTab from './components/InventoryTab/TransferProduct/InventoryTransfer';
import InventoryProductDetail from './components/InventoryTab/ProductDetail';
import InventoryListProductDetail from './components/InventoryTab/ListProductDetail';

import ListPurchase from './components/PurchasesTab/ListPurchase';
import DetailPurchaseOrder from './components/PurchasesTab/DetailPurchaseOrder';

import OptionsScreen from './screens/OpstionsScreen';
import EditProfile from './components/Options/EditProfile';

import TabNavigation from './TabScreens/TabNavigation';
import OpstionsScreen from './screens/OpstionsScreen';


const Navigation = StackNavigator({

  LoginScreen: { screen: LoginScreen },
  HomeScreen: { screen: TabNavigation },
  ScannerScreen: { screen: ScannerScreen },

  SaleTab: { screen: SaleTab },
  SaleDetail: { screen: SaleDetail },
  ListSaled: { screen: ListSaled },

  BalanceTab: { screen: BalanceTab },
  AddBalanceTab: { screen: AddBalanceTab },

  InventoryTab: { screen: InventoryTab },
  InventoryTransferTab: { screen: InventoryTransferTab },
  InventoryListProductDetail: { screen: InventoryListProductDetail },
  InventoryProductDetail: { screen: InventoryProductDetail },

  ListPurchase: { screen: ListPurchase },
  DetailPurchaseOrder: { screen: DetailPurchaseOrder },

  OptionsScreen: { screen: OptionsScreen },
  EditProfile: { screen: EditProfile },
  
}, {
    // headerMode: 'none',
  });

const defaultGetStateForAction = Navigation.router.getStateForAction;

Navigation.router.getStateForAction = (action, state) => {
  if (state && action.type === NavigationActions.back &&
    state.routes[state.index].routeName === 'HomeScreen') {
    alert("Do you want exit");
    return null;
  }
  return defaultGetStateForAction(action, state);
};

export default Navigation;