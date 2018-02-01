import { TabNavigator } from 'react-navigation';

import ScanTab from '../screens/HomeScreen';
import ProductTab from '../components/SaleTab/Products';
import BalanceTab from '../components/BalanceTab/Balance';
import InventoryTab from '../components/InventoryTab/Inventory';
import PurchasesTab from '../components/PurchasesTab/Purchases';

const TabNavigation = TabNavigator({
    ScanTab: { screen: ScanTab },
    SaleTab: { screen: ProductTab },
    BalanceTab: { screen: BalanceTab },
    InventoryTab: { screen: InventoryTab },
    PurchasesTab: { screen: PurchasesTab },
},
    {
        tabBarOptions: {
            activeTintColor: '#222',
        }
    });

export default TabNavigation;