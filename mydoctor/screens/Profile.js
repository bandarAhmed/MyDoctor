import React, { useEffect, useState } from 'react'
import { ScrollView, View, Button } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import styles from '../styles/profileStyles';
import axios from '../config/axios'
import { GET_USER } from '../config/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { transformName } from '../config/Helpers';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { DELETE_PRO } from '../config/urls';


export default function Profile(props) {

  const [user, setUser] = useState([]);
  const [userPro, setUserPro] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', title: '', type: '' });


  const { navigation } = props;

  useEffect(() => {
    _getProfile()
  }, [])


  const _getProfile = async () => {
    setLoading(true)
    try {
      const auth = await AsyncStorage.getItem('accessToken');
      const responses = await axios.get(GET_USER, {
        headers: {
          Authorization: auth
        }
      })
      setUser(responses.data)
      setUserPro(responses.data.Profile);
      setLoading(false);
      console.log(responses)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  };

  // delete my acount 
  const handleAction = async () => {
    try {
      if (alert.type === 'delete') {
        const auth = await AsyncStorage.getItem('accessToken');
        const response = await axios.delete(DELETE_PRO, { headers: { Authorization: auth } });
        props.navigation.navigate("Home")
      }
      await AsyncStorage.clear();
      props.navigation.navigate("Home")
    } catch (e) {
      console.log(e.message)
    }
  }

  const ShowAlert = (title, message, type) => {
    setAlert({
      title: title, message: message, type: type
    });
    setVisible(true)
  }

  const confirm = (type) => {
    ShowAlert(
      type == 'delete' ? "انت على وشك حذف حسابك" : 'انت على وشك تسجيل الخروج',
      type == 'delete' ? 'هل انت متأكد من حذف حسابك' : 'هل تريد تسجيل الخروج فعلا',
      type
    )
  }

  const handleConfirm = async () => {
    setVisible(false)
    await handleAction()
  };


  return (
    <ScrollView>
      <Loader loading={loading} title='جاري جلب البينات' />
      <Alert visible={visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClick={handleConfirm}
        onClose={() => setVisible(false)}
      />

      <View style={styles.container}>
        {user &&
          <View>
            <View style={styles.userIconContainer}>
              <View style={styles.userMetaContainer}>
                <View style={styles.userAvtar}>
                  <Text style={styles.userAvtarText}>
                    {/* {transformName(user.name)} */}
                  </Text>
                </View>
                <View style={styles.userMeta}>
                  <Text>{user.name}</Text>
                  <Text>{user.email}</Text>
                </View>
              </View>
              <View style={styles.iconsConatiner}>
                <Icon
                  name="edit"
                  type="font-awesome"
                  color="#f50"
                  style={{ marginLeft: "5px" }}
                  onPress={() => navigation.navigate("UpdateProfile")}
                />
                <Icon
                  name="trash"
                  type="font-awesome"
                  color="#f50"
                  onPress={() => confirm('delete')}
                />
              </View>
            </View>
            {userPro != null ?
          <View>
            <View style={{ marginBottom: '50px' }}>
              <View style={styles.doctorInfo}>
                <View style={styles.infoCell}>
                  <Text style={styles.infoTitle}>الاختصاص</Text>
                  <Text style={styles.infoText}>
                    {userPro.spechlazation}
                  </Text>
                </View>
                <View style={styles.infoCell}>
                  <Text style={styles.infoTitle}>العنوان</Text>
                  <Text style={styles.infoText}>{userPro.address}</Text>
                </View>
                <View style={styles.infoCell}>
                  <Text style={styles.infoTitle}>ساعات العمل</Text>
                  <Text style={styles.infoText}>
                    {userPro.workingHours}
                  </Text>
                </View>
                <View style={styles.lastCell}>
                  <Text style={styles.infoTitle}>رقم الهاتف</Text>
                  <Text style={styles.infoText}>{userPro.phone}</Text>
                </View>
              </View>
            </View>
          </View> : ''
        }
        <Button buttonStyle={styles.logoutButton} title="تسجيل الخروج" onPress={() => confirm('logout')} />
        </View>
        }
      </View>
    </ScrollView>
  )
};
