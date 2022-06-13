import React, {useState} from 'react';
import {View,Text,Pressable,StyleSheet,ImageBackground} from 'react-native'
import { TextInput,Button } from 'react-native-paper';

import { realm } from '../database/getRealmApp';
import {ObjectID} from 'bson';

import { Formik } from 'formik';
import * as Yup from 'yup';

const ModifScreen = ({ navigation,route }) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');


    const validations = Yup.object().shape({
      title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      author: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      category: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    });

    const initalValues = {
      title: title,
      author: author,
      category:category
    }

    return(
    <Formik initialValues={initalValues} validationSchema={validations} onSubmit={(values, actions) => {} }>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
        <ImageBackground source={require('../../assets/img/library-books-wood.jpg')} blurRadius={6} style={{width: '100%', height: '100%'}}>
    <View style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontWeight:'bold',fontSize:25,marginBottom:20,borderBottomWidth:2,padding:20}}>Ajoute un livre</Text>

    <TextInput style={styles.textinput} placeholder='Nom du livre' onChangeText={handleChange('title')} onBlur={handleBlur("title")}></TextInput>
    {errors.title && touched.title ? <Text style={{color:'red'}}>{errors.title}</Text> : null}
    <TextInput style={styles.textinput} placeholder='Auteur' onChangeText={handleChange("author")} onBlur={handleBlur("author")}></TextInput>
    {errors.author && touched.author ? <Text style={{color:'red'}}>{errors.author}</Text> : null}
    <TextInput style={styles.textinput}  placeholder='Categorie' onChangeText={handleChange("category")} onBlur={handleBlur("category")}></TextInput>
    {errors.category && touched.category ? <Text style={{color:'red'}}>{errors.category}</Text> : null}
    <Button style={{margin:10}} mode="contained" onPress={()=>{
      handleSubmit();
      if (isValid){
      realm.write(()=>{
        realm.create('Book_',{
          _id:new ObjectID(),
          author:values.author,
          category:values.category,
          title:values.title
      })})
    
      navigation.navigate('Home');
    }}}>Ajouter un livre</Button>
    <Button style={{margin:10}} mode="contained" onPress={()=>{
      realm.write(()=>{
        realm.deleteAll()
      })
    }}>Clear REALM</Button>

</View></ImageBackground>)}</Formik>)}

const styles = StyleSheet.create({
    button:{
      display:'flex',justifyContent:'center',alignItems:'center',width:300,height:100,backgroundColor:"green",marginTop:20
    },
    textinput:{
      width:300,
      height:50,
      marginBottom:10
    },
    textbutton:{
      color:'white',
      fontSize:20,
      fontWeight:'bold',
      textAlign:'center'
    }
  })

export default ModifScreen