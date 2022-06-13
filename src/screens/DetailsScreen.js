import React from 'react';

import {Text,View,StyleSheet,Pressable,ImageBackground} from 'react-native'

import { realm } from '../database/getRealmApp';

import { Button } from 'react-native-paper';

const DetailsScreen = ({ route, navigation }) => {

    const { title, author, category, _id} = route.params;

    return (
        <ImageBackground source={require('../../assets/img/library-books-wood.jpg')} blurRadius={6} style={{width: '100%', height: '100%'}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.text,{fontSize:40}]}>{title}</Text>
                <Text style={styles.text}>Auteur: {author}</Text>
                <Text style={styles.text}>Categorie: {category}</Text>
                <Text style={styles.text}>Identifiant: {String(_id)}</Text>
                <Button style={{margin:10}} mode="contained" onPress={()=>{

                    const book_ = realm.objects("Book_");

                    book_.map(book2 => {
                        if ((typeof(book2) != 'undefined') && (String(book2._id) == String(_id))) {
                            realm.write(() => {
                                console.log("Suppression du livre: "+book2.title)
                                realm.delete(book2);
                                navigation.navigate('Home');
                            })
                        }
                    })

                }}>Supprimer le livre</Button>
                <Button style={{margin:10}} mode="contained" onPress={()=>{
                    navigation.navigate('ModifBook', { title_: title, author_: author, category_: category, _id: _id });
                }}>Modifier le livre</Button>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    textinput:{
      width:200,
      height:50
    },
    text:{
        color:'white',
        fontSize:20
    },
    textbutton:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    }
  })


export default DetailsScreen