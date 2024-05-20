import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet} from 'react-native';
import DoctorScrean from './screens/Doctor';
import HomeScrean from './screens/Home';
import SginUp from './screens/SiginUp';
import SginIn from './screens/SginIn';
import Profile from './screens/Profile';


export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' options={{headerShown: false}} component={HomeScrean}/>
        <Stack.Screen name='Doctor' component={DoctorScrean} options={{title: 'الاطباء'}}/>
        <Stack.Screen name='SginUp' component={SginUp} options={{title: 'انشاء حساب جديد'}}/>
        <Stack.Screen name='SginIn' component={SginIn} options={{title: "تسجيل الدخول"}}/>
        <Stack.Screen  name="Profile" component={Profile} options={{title: "الملف الشخصي"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
