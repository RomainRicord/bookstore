import React, {useState,useEffect} from 'react';
import {View,Text,Pressable,StyleSheet, ImageBackground} from 'react-native'
import {Button} from 'react-native-paper'

import { ScrollView } from 'react-native-gesture-handler';

import Realm from 'realm';

import { BookSchema_ } from '../schema/BookSchema';

const HomeScreen = ({ navigation,route }) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');

    const [book, setBook] = useState([]);

    useEffect(() => {
        Realm.open({
        schema: [BookSchema_],
        deleteRealmIfMigrationNeeded: true,
        }).then(realm => {
        const book = realm.objects('Book_');

        setBook([...book]);
        try{
            book.addListener(() => {
                setBook([...book]);
            });
        }
        catch (error) {
            console.error(
            `Unable to update the book' state, an exception was thrown within the change listener: ${error}`
            );
        }
        return () => {
            
            book.removeAllListeners();
            
            realm.close();
        };
        });
    }, []);

    return(
        <ImageBackground source={require('../../assets/img/library-books-wood.jpg')} blurRadius={6} style={{width: '100%', height: '100%'}}>
    <View style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
        
        <Text style={{color:'white',fontSize:20,fontWeight:'bold',textAlign:'center',marginTop:20,borderBottomWidth:2,padding:20}}>Liste des livres</Text>

        <ScrollView style={{flex:1,margin:10}}>
            {book.map( (book,index) => (
                <Pressable key={index} onPress={()=>{
                    navigation.navigate('Details',{
                        title:book.title,
                        author:book.author,
                        category:book.category,
                        _id:String(book._id)
                    })
                }}><View key={index} style={styles.book}>
                <Text style={styles.text}>Titre: {book.title}</Text>
                <Text style={styles.text}>Auteur: {book.author}</Text>
                <Text style={styles.text}>Categorie: {book.category}</Text>
                </View>
                </Pressable>
                )
            )}
        </ScrollView>

        <Button style={{margin:10}} mode="contained" onPress={()=>{
            navigation.navigate("ModifScreen")
        }  }>Ajouter un livre</Button>
        
    </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    button:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:300,
      height:100,
      backgroundColor:"green",
      marginTop:20,
      borderRadius:20
    },
    textbutton:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    textinput:{
      width:200,
      height:50
    },
    text:{
        color:'white',
        fontSize:20,
        textAlign:'center'
    },
    book:{
        borderWidth:2,borderColor:'black',width:300,height:100,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20,
        backgroundColor:'rgba(12,12,12,0.5)'
    }
  })

export default HomeScreen