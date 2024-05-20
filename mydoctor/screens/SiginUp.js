import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import axios from '../config/axios'
import styles from '../styles/authStyles';
import {Icon, Text} from 'react-native-elements';
import ProfileForms from '../components/ProfileForms';
import { Register } from '../config/urls';
import * as Location from 'expo-location';
import Loader from '../components/Loader';
import Alert  from '../components/Alert';



export default function SginUp(props) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading , setLoading] = useState(false)
  const [visible , setVisible] = useState(false)
  const [alert, setAlert]= useState({type: "", title: "", message: ""})

  const { navigation } = props;

    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('المستخدم لم يصرح عن موقعه');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      })();
    }, []);

    const _Sgin_Up = async (values)=> {
      const body = {
        name:values.name,
        email: values.email,
        password: values.password,
        userType: values.userType ? 'doctor' : 'normal',
        spechlazation: values.spechlazation,
        workingHours: values.workingHours,
        address: values.address,
        phone: values.phone,
        location: {
          latitude:  location ? location.latitude : errorMsg,
          longitude: location ? location.longitude : errorMsg,
        }
      }
      try {
        setLoading(true)
        setVisible(true)
        const response = await axios.post(Register, body)
        console.log(response)
        setLoading(false)
        setAlert({
          title: "تم انشاء حساب بنجاح",
          message: "هل تريد الذهاب الى صفحه التسجيل",
          type: 'question'
        })
      } catch (e) {
        console.log(e.response.data.errors[0].message)
        setLoading(false)
        setAlert({
          title: "الحساب موجود بالفعل",
          message: e.response.data.errors[0].message,
          type: 'alert'
        })
      }
    }

  return (
    <ScrollView>
          <Loader title='جاري انشاء الحساب' loading={loading}/>
          <Alert 
          visible={visible} 
          type={alert.type} 
          title={alert.title}
          message={alert.message}
          onClose={()=> setVisible(false)}
          onClick={()=> {
             setVisible(false)
             navigation.navigate('SginIn') 
            }}
           />
          <View style={styles.container}>
          <Icon style={styles.icon} name='person'/>
          <Text h4>انشاء حساب جديد</Text>
          </View>
          <KeyboardAvoidingView behavior='padding' enabled>
            <View style={styles.container}>    
            <ProfileForms onSubmit={(values) => _Sgin_Up(values)} />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
  )
};
