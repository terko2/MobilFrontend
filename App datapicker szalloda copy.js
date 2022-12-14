import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity,Linking, Button,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
//const ipcim="192.168.6.7:3000";
const IP = require('./ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      isLoading: true,
      feladat:"",
      date:new Date(),
      show:false,
      datum:"",
      isChecked:true
    };
  }



  async getMovies() {
    try {
      const response = await fetch(IP.ipcim+'szalloda');
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

  //Bemenet
  

  szavazat=(szam)=>{
    //alert(szam)
    var adatok={
      bevitel1:szam
    }

    alert(adatok.bevitel1)
    const response = fetch(IP.ipcim+'szalloda',{
      method: "POST",
      body: JSON.stringify(adatok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
      const text =  response.text();
      console.log(text)
  }

/*-------------------------------------------- Datitempicker függvényei */
onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  this.setState({show:false});
  this.setState({date:currentDate});
  

};

showMode = (currentMode) => {
  if (Platform.OS === 'android') {
    this.setState({show:true});
    // for iOS, add a button that closes the picker
  }
  
  
};

showDatepicker = () => {
  this.showMode('date');
};

/*-------------------------------------------- Datitempicker függvényei */
onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  this.setState({show:false});
  this.setState({date:currentDate});
  

};

showMode = (currentMode) => {
  if (Platform.OS === 'android') {
    this.setState({show:true});
    // for iOS, add a button that closes the picker
  }
  
  
};

showDatepicker = () => {
  this.showMode('date');
};

/*--------------------------------------- Datitempicker függvényei vége*/
felvitel=()=>{
  let uj=[]
  if (this.state.data!=null)
    {
      uj=this.state.data
    }
  uj.push({
    "id":this.state.data.length,
    "megnevezes":this.state.feladat,
    "datum": this.state.date.getFullYear()+"/"+(this.state.date.getMonth()+1)+"/"+this.state.date.getDate(),
    
    "kesz":0
  })
  this.setState({data:uj })
  this.storeData(uj)
}



//Évjárat függvény
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

/*Iconok és szinek
--------✈----------  
--------#68BBE3-----
*/
  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 , marginTop:40}}>
<Button onPress={this.showDatepicker} title="Dátum" />   
       <Text style={{marginLeft:"auto", marginRight:"auto", backgroundColor:"yellow",textAlign:"center", width:200, margin:10,padding:10}}> 
    {this.state.date.getFullYear()+"/"+(this.state.date.getMonth()+1)+"/"+this.state.date.getDate()}
    </Text>
    {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode="date"
          is24Hour={true}
          onChange={this.onChange}
        />
      )}
<Text style={{fontSize:30,color:'#68BBE3',textAlign:'center'}}>
                Nyaralás
              </Text>


            <TextInput
        style={{height: 35, borderColor:"blue",borderWidth:1, margin:5, padding:5}}
        placeholder="Írd be egy szállodát!"
        onChangeText={szoveg => this.setState({feladat : szoveg})}
        value={this.state.feladat}
      />  
      {/*     
       <Button onPress={this.showDatepicker} title="Dátum" />   
       <Text style={{marginLeft:"auto", marginRight:"auto", backgroundColor:"yellow",textAlign:"center", width:200, margin:10,padding:10}}> 
    {this.state.date.getFullYear()+"/"+(this.state.date.getMonth()+1)+"/"+this.state.date.getDate()}
    </Text>
    {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode="date"
          is24Hour={true}
          onChange={this.onChange}
        />
      )}
    */}
<TouchableOpacity style={{marginLeft:"auto",textAlign:"center",backgroundColor:"#68BBE3",alignItems:"center"}}>
<Button onPress={this.state.feladat} title="Keresés" /> 

              <Text></Text>
            </TouchableOpacity>
            
            

      <TouchableOpacity style={{marginTop:20,backgroundColor:"red",width:30,borderRadius:15,padding:5,alignItems:"center"}}
      onPress={()=> this.setState({feladat:""})}
      >
            <Text>X</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft:"auto", marginRight:"auto",textAlign:"center",backgroundColor:"#68BBE3",width:100,borderRadius:5,padding:15,alignItems:"center"}}>
              <Text>Menü</Text>
            </TouchableOpacity>
        
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ szalloda_id }, index) => szalloda_id}
            renderItem={({ item }) => (

              <View style={{marginBottom:30}}>
              <Text style={{fontSize:30,color:'darkred',textAlign:'center'}}>
                {item.szalloda_neve}
              </Text>
              <Text style={{fontSize:30,color:'darkred',textAlign:'center'}}>
                {item.csillagok_ertek}★ 
              </Text>
              <Image   source={{uri:'http://192.168.6.7:3000/'+item.szalloda_kep}} style={{width:300,height:300,alignSelf:'center'}}   />
              <Text style={{fontSize:20,color:'dark',textAlign:'center'}}>
                {item.auto_evjarat}
              </Text>
              <TouchableOpacity
          style={styles.button}
          onPress={async ()=>this.szavazat(item.szallod_id)}
        >
          <Text style={{fontStyle:"italic",color:'white',fontSize:30}}>Kivétel</Text>
          
          
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
    padding: 5,
    marginLeft:20,
    marginRight:20
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});