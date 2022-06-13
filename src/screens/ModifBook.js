import React, {useState} from 'react';
import {View,Text,Pressable,StyleSheet,ImageBackground} from 'react-native'
import { TextInput,Button } from 'react-native-paper';

import { realm } from '../database/getRealmApp';

import { Formik } from 'formik';
import * as Yup from 'yup';

const ModifBook = ({ navigation,route }) => {

    const {title_,author_,category_,_id} = route.params;

    const [title, setTitle] = useState(title_);
    const [author, setAuthor] = useState(author_);
    const [category, setCategory] = useState(category_);

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

    console.log(initalValues)

    return(
        <Formik initialValues={initalValues} validationSchema={validations} onSubmit={(values, actions) => {} }>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <ImageBackground source={require('../../assets/img/library-books-wood.jpg')} blurRadius={6} style={{width: '100%', height: '100%'}}>
                    <View style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,fontWeight:'bold',borderBottomColor:'black',borderBottomWidth:2,padding:20}}>Modifie le livre !</Text>
                        
                        <Text style={[styles.texttop,{marginTop:20}]}>Titre:</Text>
                        <TextInput style={styles.textinput} value={values.title} placeholder='nom du livre' onChangeText={handleChange('title')} onBlur={handleBlur("title")}></TextInput>
                        {errors.title && touched.title ? <Text style={{color:'red'}}>{errors.title}</Text> : null}
                        <Text style={styles.texttop}>Auteur:</Text>
                        <TextInput style={styles.textinput} value={values.author} placeholder='auteur' onChangeText={handleChange("author")} onBlur={handleBlur("author")}></TextInput>
                        {errors.author && touched.author ? <Text style={{color:'red'}}>{errors.author}</Text> : null}
                        <Text style={styles.texttop}>Catégorie:</Text>
                        <TextInput style={styles.textinput}  value={values.category} placeholder='categorie' onChangeText={handleChange("category")} onBlur={handleBlur("category")}></TextInput>
                        {errors.category && touched.category ? <Text style={{color:'red'}}>{errors.category}</Text> : null}
                        <Button style={{margin:10}} mode="contained" onPress={()=>{
                            handleSubmit();
                            if (isValid) {
                                const book_ = realm.objects("Book_");

                                book_.map((book2,index) => {
                                    if ((typeof(book2) != 'undefined') && (String(book2._id) == String(_id))) {
                                        realm.write(() => {
                                            console.log("Modification du livre: "+book2.title)
                                            
                                            const thefameuxbook = book_[index]

                                            thefameuxbook.title = String(values.title);
                                            thefameuxbook.author = String(values.author);
                                            thefameuxbook.category = String(values.category);

                                            navigation.navigate('Home');
                                        })
                                    }
                                })
                            }
                        } }>Modifier</Button>

                    </View>
                </ImageBackground>
            )}
        </Formik>
)}

const styles = StyleSheet.create({
    button:{
      display:'flex',justifyContent:'center',alignItems:'center',width:300,borderRadius:20,height:100,backgroundColor:"green",marginTop:20
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
    },
    texttop:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    }
  })

export default ModifBook