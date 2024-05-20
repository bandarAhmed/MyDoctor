import React, { useEffect, useState } from 'react'
import { ScrollView, View, Button } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import styles from '../styles/profileStyles';
import axios from '../config/axios'
import { GET_USER } from '../config/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { transformName } from '../config/Helpers';
import Loader  from '../components/Loader';
import Alert  from '../components/Alert';
export default function Profile(props) {

  const [user, setUser] = useState([]);
  const [userPro, setUserPro] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({message: '', title: '', type: ''});


  useEffect(() => {
    _getProfile()
    }, [])


  const _getProfile = async () => {
    try {
      setVisible(true)
      setLoading(true)
      const auth = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(GET_USER, {
        headers: {
          Authorization: auth
        }
      })
      setUser(response.data)
      setUserPro(response.data.Profile);
      setVisible(false)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setVisible(false)
      setLoading(false)
    }
  }

  return (
    <ScrollView>
      <Loader loading={loading} title='جاري جلب البينات' />

      <View style={styles.container}>
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

          <Button buttonStyle={styles.logoutButton} title="تسجيل الخروج" onPress={() => confirm('logout')} />
        </View>
      </View>
    </ScrollView>
  )
};
