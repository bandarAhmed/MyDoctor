import React, { useState } from 'react'
import {  KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import styles from '../styles/authStyles';
import axios from '../config/axios';
import {Icon, Text} from 'react-native-elements';
import { SIGNIN_URL } from '../config/urls';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SginIn(props) {
    const [loading, setLoading ] = useState(false);
    const [visible, setVisible]= useState(false)
    const [alert, setAlert] = useState({type: "", title: "", message: ""})

    const { navigation } = props;

    const signInValidationSchema  = yup.object().shape({
        email: yup.string().required('يجب ادخال بريدك').email('ادخل بريد اكتروني حقيقي'),
        password: yup.string().required('ادخل كلمه السر')
    });

    const _signIn = async (values) => {
        setLoading(true)
        const body = {
            email: values.email,
            password: values.password
        }

        try {
            const response = await axios.post(SIGNIN_URL, body);
            AsyncStorage.setItem("accessToken", response.data.accessToken);
            setLoading(false)
            props.navigation.navigate("Home")
        } catch (e) {
            console.log(e);
            setLoading(false)
            setAlert({
                title: "تنبيه",
                message: e.message,
                type: "alert"
            })
            setVisible(true)
        }
    }

  return (
    <ScrollView>
        <Loader loading={loading} title='جاري تسجيل الدخول'/>
        <Alert visible={visible} title={alert.title} message={alert.message} type={alert.type} onClose={()=> setVisible(false)}/> 
        <View style={styles.container}>
        <Icon name='person'/>
        <Text h4>تسجيل الدخول</Text>
        </View>
        <KeyboardAvoidingView behavior='padding' enabled>
            <Formik
            initialValues={{ email: '', password: ''}}
            validationSchema={signInValidationSchema}
            onSubmit={(values)=> _signIn(values)}
            >
            {
                ({handleChange, handleBlur, handleSubmit, errors, values, isValid})=> (
                    <View style={styles.container}>
                    <Input 
                    style={[styles.textInput, errors.email && styles.errorInput]}
                    placeholder='ادخل البريد'
                    value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} name='email'/> 
                    {errors.email && <Text style={styles.errorInput}>{errors.email}</Text>}
                    <Input 
                    style={[styles.textInput, errors.password && styles.errorInput]}
                    value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} name='password' placeholder='ادخل كلمه المرور' secureTextEntry/>
                    {errors.password && <Text style={styles.errorInput}>{errors.password}</Text>}
                    <Button title='تسجيل' onPress={handleSubmit} disabled={!isValid} />
                    </View>
                )
            }
            </Formik>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}
