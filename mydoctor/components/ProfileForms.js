import React from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import {Button, CheckBox, Input, Text} from 'react-native-elements';
import styles from '../styles/authStyles';

export default function ProfileForms(props) {

    const valdationSchema = yup.object().shape({
        name: yup.string().required('هذا الحقل مطلوب'),
        email: yup.string().email('بجب ادخال بريد حقيقي').required('هذا الحقل مطلوب'),
        password: yup.string().required('هذا الحقل مطلوب'),
        userType: yup.boolean(),
        spechlazation: yup.string().when("userType", {
          is: true,
          then: (schema)=> schema.required('يجب عليك اداخل التخصص')
        }),
        workingHours: yup.string().when("userType", {
          is: true,
          then: (schema)=> schema.required('يجب عليك اداخل التخصص')
        }),
        address: yup.string().when("userType", {
          is: true,
          then: (schema)=> schema.required('يجب عليك اداخل التخصص')
        }),
        phone: yup.string().when("userType", {
          is: true,
          then: (schema)=> schema.required('يجب عليك اداخل التخصص')
        }),
      });

  return (
    
    <Formik
    initialValues={{
        name: '',
        email: '',
        password: '',
        userType: false,
        spechlazation: '',
        workingHours: '',
        address: '',
        phone: '',
        latitude: null,
        longtiude: null,
    }}
    validationSchema={ valdationSchema}
     onSubmit={(values)=> props.onSubmit(values)}
    >
        {
          ({handleChange, handleBlur, handleSubmit, errors, values, setFieldValue, isValid})=> ( 
            <>
            {/* name input use fromik */}
                <Input style={[styles.textInput, errors.name && styles.errorInput]} 
                placeholder='ادخل اسم المستخدم'
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                name='name'
                />
                {errors.name && <Text p style={styles.errorInput}>{errors.name}</Text>}
                {/* email input use fromik */}
                <Input style={[styles.textInput, errors.name && styles.errorInput]} 
                placeholder='ادخل البريد الاكتروني'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                name='email'
                />
                {errors.email && <Text p style={styles.errorInput}>{errors.email}</Text>}
                {/* password input use fromik */}
                <Input style={[styles.textInput, errors.name && styles.errorInput]} 
                placeholder='ادخل كلمه المرور'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                name='password'
                secureTextEntry
                />
                {errors.password && <Text p style={styles.errorInput}>{errors.password}</Text>}
                <CheckBox 
                  style={styles.checkbox}
                  checked={values.userType}
                  title='انا طبيب'
                  name='userType'
                  onPress={()=> setFieldValue('userType', !values.userType)}
                  onValueChange={values.userType}
                />
                {
                  values.userType && (
                <>  
                {/* input of spechlazation */}
                <Input style={[styles.textInput, errors.name && styles.errorInput]} 
                placeholder='التخصص'
                value={values.spechlazation}
                onChangeText={handleChange('spechlazation')}
                onBlur={handleBlur('spechlazation')}
                name='spechlazation'
                />
                {errors.spechlazation && <Text p style={styles.errorInput}>{errors.spechlazation}</Text>}
                {/* input of address */}
                <Input style={[styles.textInput, errors.name && styles.errorInput]} 
                placeholder='العنوان'
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                name='address'
                
                />
                {errors.address && <Text p style={styles.errorInput}>{errors.address}</Text>}
                {/* input of workingHours */}
                <Input style={[styles.textInput, errors.name && styles.errorInput]} 
                placeholder='ساعات العمل'
                value={values.workingHours}
                onChangeText={handleChange('workingHours')}
                onBlur={handleBlur('workingHours')}
                name='workingHours'
                />
                {errors.workingHours && <Text p style={styles.errorInput}>{errors.workingHours}</Text>}
                {/* input of phone */}
                <Input style={[styles.textInput, errors.name && styles.errorInput]} 
                placeholder='رقم الهاتف مع رمز الدوله'
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                name='phone'
                />
                {errors.phone && <Text p style={styles.errorInput}>{errors.phone}</Text>}
                </>
                )}
              <Button disabled={!isValid} onPress={handleSubmit} title='Sobmit'/>
            </>
        )
      }    
    </Formik>
  
  )
};