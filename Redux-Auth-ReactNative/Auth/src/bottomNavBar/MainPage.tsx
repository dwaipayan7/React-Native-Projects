
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomePage from '../pages/HomePage';
import DetailsPage from '../pages/DetailsPage';
import ProfilePage from '../pages/ProfilePage';

const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name='Home' component={HomePage} />
            <Tab.Screen name='Details' component={DetailsPage} />
            <Tab.Screen name='Profile' component={ProfilePage} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;