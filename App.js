import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react'; //Importa o react e o hook useState para gerenciar o estado dos componentes.
import axios from 'axios'; //Importa a biblioteca axios para fazer requisições HTTP (chamadas à API)


const API_Key = 'b90fa6b95bf4111c412a35909b1bcdb5' //Define uma constante para armazenar a chave de API.

const API_URL_BASE = 'https://api.openweathermap.org/data/2.5/weather' //Define a URL da API do Openweathermap para buscar o clima atual.

export default function App() { //Define e exporta o componente principal do aplicativo do aplicativo chamado 'App'.

  const [cidade, setCidade] = useState('');

  const [dadosClima, setDadosClima] = useState(null); //Declara um estado "dadosClimas" (inicialmente nulo) para armazanar os dados do clima recebidos, e 'setDadosClima' para atualizá-lo.

  const [carregando, setCarregando] = useState(false) //Declara um estado "carregando" (inicialmente falso) para controlar a exibição do indicador de carregamento, e 'setCarregando' para atualizá-lo.

  const [erro, setErro] = useState(null); // Declara um estado  'erro' (inicialmente nulo) para armazenar mensagens de erro, e 'setErro' para atualizá-lo.

  const buscarClima = async () => { //Define uma função assícrona chamada 'buscaClima', que será chamada quando o boão for pressionado.

    if (!cidade.trim()) {

      Alert.alert("Atenção", "Por favor, digite o nome da cidade");

      return; //interrompe a execução da função 'buscarClima' se nenhuma cidade foi digitada.

    }
    setCarregando(true); //Define o estado "carregando" como verdadeiro para indicar que a busca começou (ex: mostrar um spinner)

    setDadosClima(null); //Limpa os dadso do clima anteriores (se houver) antes de fazer uma nova busca.

    setErro(null); //Limpa mensagens de erro anteriores antes de fazer uma nova busca.
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Previsão do Tempo</Text>
      
      <TextInput style={styles.input} placeholder="Digite o nome da cidade"
        value={cidade} //O valor exibido no TExtInput é controlado pelo estado 'cidade'.
        onChangeText={setCidade} //Quando o texto no TextInput muda, a função 'setCidade' é chmada par atualizar o estado 'cidade'.
      />
      {/* FInm do componente TextInput */}

      <Button title='Buscar Clima' onsPress={buscarClima} disabled={carregando}></Button>
    </View>

  );
}

const styles = StyleSheet.create({

});
