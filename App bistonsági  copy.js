import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity,Linking, Button,TextInput, Picker} from 'react-native';
//const ipcim="192.168.6.7:3000";
const IP = require('./ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      datum:"",
      akcio:"",
      nap:""
      
    };
  }

  async getMovies() {
    try {
      const response = await fetch(IP.ipcim+'auto');
      const json = await response.json();
      console.log(json)
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

    //Kölcsönzés
  felvitel=async ()=>{
    //alert(this.props.akttema)
    try {
      let adatok={
        bevitel1:this.state.tabla_id,
        bevitel2:this.state.auto_id,
        bevitel3:this.state.datum,
        bevitel4:this.state.nap,
        bevitel5:"2022-11-17",
        bevitel6:this.props.akttema
      }
      const response = await fetch(IP.ipcim+'felvitel',
      {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      );
      
      alert(response)
      
    } catch (error) {
      console.log(error);
    } finally {
      
    }
    


} 
//------------------------------------


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


  akcio=(ar)=>{
    alert(szam)

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

              


              <View style={{marginBottom:30}}>
              <Text style={{fontSize:30,color:'black',textAlign:'center',backgroundColor:"#68BBE3"}}>
                {item.auto_nev}
              </Text>

              <Text style={{fontSize:20,color:'black',textAlign:'center'}}>
                {item.auto_akcio}
              </Text>

             
              { item.auto_akcio==''    ? 
              null
              :   <View>
              <Text style={{fontSize:20,backgroundColor:'#FFBF00',textAlign:'center'}}>Akciós ár :</Text>
                <Text style={{fontSize:20,backgroundColor:'#FFBF00',textAlign:'center'}}>{item.auto_akcios_ar}</Text>
                </View>
              }
               
                
              

              <Text style={{fontSize:20,color:'black',textAlign:'right'}}>
                {item.auto_napiar}
              </Text>

              <Text style={{fontSize:20,color:'black'}}>
                {item.auto_ar}
              </Text>


             
  
        


              

              <Image   source={{uri:'http://192.168.6.7:3000/'+item.auto_kep}} style={{width:300,height:300,alignSelf:'center'}}   />
              <Text style={{fontStyle:"italic",fontSize:20,color:'dark',backgroundColor:"#68BBE3",textAlign:'center'}}>
                Évjárata:{item.auto_evjarat}
              </Text>


              <TouchableOpacity
          style={styles.button}
          onPress={async ()=>this.szavazat(item.auto_id,item.datum,item.nap)}
        >
          <Text style={{fontStyle:"italic",color:'white',fontSize:30}}>Ezt Kölcsönzöm</Text>
          <Button
            onPress={()=>this.felvitel()}
            title="Felvitel"
          />
          
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