import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center',
       writingDirection: 'rtl',
       alignItems: 'center',
       marginTop: '50px'
   },
   checkBoxContainer: {
       flexDirection: 'row-reverse',
   },
   checkbox: {
       border: 'none',
       backgroundColor: 'transparent',
       writingDirection: 'rtl',
       borderRadius: '100px'
   },
   icon: {
    fontSize: '80px',
   },
   textInput: {
    height: 40,
    width: '100%',
    writingDirection: 'rtl',
    textAlign: 'right',
    outlineStyle: 'none',
  },
  errorInput: {
    border: '1px solid red',
    borderRadius: 5,
  },
  textError: {
    textAlign: 'right',
    fontSize: 12, 
    color: 'red',
    marginBottom: 10
  },
  mapContainer: {
    height: 200, marginTop: 20, width: '90%'
  },
  map : {
    flex: 1,
  }
});

export default styles;