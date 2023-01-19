import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity,Linking, Button,TextInput } from 'react-native';
//const ipcim="192.168.6.7:3000";
const IP = require('./ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      isLoading: true,
      datum:"",
      nap:""
    };
  }



  async getMovies() {
    try {
      const response = await fetch(IP.ipcim+'kolcsonzes');
      const json = await response.json();
      console.log(json)
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  
  componentDidMount() {
    this.getMovies();
  }

  szavazat=(szam)=>{
    //alert(szam)
    var adatok={
      bevitel1:szam
    }
    alert(adatok.bevitel1)
    const response = fetch(IP.ipcim+'szavazat',{
      method: "POST",
      body: JSON.stringify(adatok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
      const text =  response.text();
      console.log(text)
  }


  evjarat=(ev)=>{
    //alert(szam)
    var datumok={
      datum:szamok
    }
    alert(datumok.datum)
    const response = fetch(IP.ipcim+'auto_evjarat',{
      method: "POST",
      body: JSON.stringify(datumok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
      const text =  response.text();
      console.log(text)
  }



  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 , marginTop:40}}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ auto_id }, index) => auto_id}
            renderItem={({ item }) => (

              <View style={{marginBottom:20}}>
              <Text style={{fontSize:15,color:'black',textAlign:'left'}}>
                {item.auto_nev}
                </Text>
                
              <Image   source={{uri:'http://192.168.6.7:3000/'+item.auto_kep}} style={{width:150,height:150,alignSelf:'left'}}   />
              <Text style={{fontSize:15,color:'darkred',textAlign:'left'}}>
                {item.kolcsonzes_datum}
                </Text>
              <Text style={{fontSize:20,color:'dark',textAlign:'left'}}>
                Az ár {item.kolcsonzes_nap} napra:
              </Text>
              <Text style={{fontSize:18,color:'black',textAlign:'Left'}}>
                {item.auto_ar}
                </Text>
              <Text style={{fontSize:15,color:'black',textAlign:'center'}}>
              A kölcsönzött telefonszáma: +36{item.kolcsonzes_telefon}
              </Text>
              
              <TouchableOpacity
          style={styles.button}
          onPress={async ()=>this.szavazat(item.auto_nev)}
        >
          <Text style={{fontStyle:"italic",color:'white',fontSize:20}}>Kölcsönzés</Text>
          
        </TouchableOpacity>           
              </View>
            )}
          />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#68BBE3",
    padding: 10,
    marginLeft:30,
    marginRight:30
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});