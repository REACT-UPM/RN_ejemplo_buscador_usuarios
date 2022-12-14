import { useState } from "react";
import Resultados from "./Resultados";
import Header from "./Header";
import {mock1} from "./constants/users.js";
import CONFIG from "./config/config";
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';

const USE_SERVER = CONFIG.use_server;

//ideas:
//probar response.status y si no es 200 poner un error en pantalla
//
function App () {
  const [query, setQuery] = useState("");
  const [resultado, setResultado] = useState(null);

  const callServer = async (param) => {
    console.log('a', param, query);
      if(USE_SERVER) {
        try {
          let queryparams = "";
          if(param==="all"){
            queryparams = "?limit=" + CONFIG.num_items;
          } else {
            queryparams = "/search?q=" + query;
          }
          const response = await fetch(`${CONFIG.server_url}${queryparams}`);
          const data = await response.json();         
          //console.log(data);
          setResultado(data.users);
        } catch (error) {
          console.log(error);
          setResultado({ error: {description: error.message} });
        }
      } else {
        //console.log(mock1.users)
        setResultado(mock1.users);
      }
  }

  return (
      <View style={styles.container} id="main">
        <Header />
        <Text id="buscador">Buscador de usuarios</Text>
        <View>
          <TextInput type="text" id="query" placeholder="Texto a buscar" value={query} onChangeText={setQuery}></TextInput>
        </View>
        <Button title='Buscar' id="botonsearch" className="new" onPress={() =>callServer()}/>
        <Button title="Ver todos" id="botonall" className="new" onPress={() =>callServer("all")}/>      
        {resultado && <Resultados numitems={CONFIG.num_items} resultado={resultado} />} 
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
