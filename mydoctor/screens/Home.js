import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScrean(props) {
    const { navigation } = props
  return (
    <View style={styles.container}>
        <Button onPress={()=> navigation.navigate('Doctor')} title='كل الاطباء'></Button>
        <Button onPress={()=> navigation.navigate('SginUp')} title='انشاء حساب'></Button>
        <Button onPress={()=> navigation.navigate('SginIn')} title='تسجيل'></Button>
        <Button onPress={()=> navigation.navigate("Profile")} title='الملف الشخصي'></Button>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
