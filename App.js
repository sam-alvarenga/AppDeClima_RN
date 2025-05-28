import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
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

    //inicia um bloco 'thy' para tentar executar a chamada à API, o que pode gerar erros
    try {
      //Faz uma requisição HTTP GET para a API_URL_BASE usando axios. 'await' pausa a função até a promessa seja resolvida
      const repondese = await axios.get(API_URL_BASE, {
        params: {
          q: cidade,
          appid: API_Key,
          units: 'metric',
          lang: 'pt_br',
        },
      }); //Fim da chamada axios.get. A variável 'response' conterá a reposta da API

      setDadosClima(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 404) {
        setErro(`Cidade "${cidade}" não encontrada. Verifique o nome e tente novamente.`)

      } else if (error.response && error.response.status === 401) {

        setErro(`Chave de API inválida ou não autorizada. Verifique sua API Key`);

      } //Fim da verificação do status 401. 
      else {

        setErro('Não foi possível buscar os dados do clima. Tente novamente mais tarde');
      }//Fim do bloco 'else' para outros erros
    } finally {
      //Estado 'carregando' falso, pois a tentantiva de busca terminou (com sucesso ou falha)
      setCarregando(false)
    }
  }
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

    {carregando && <ActivityIndicator style={styles.info} size="large" color="#0000ff" />}

    {erro && <Text style={styles.erro}>{erro}</Text>}

    {dadosClima && (
      <View style={styles.climaContainer}>

        <Text style={styles.nomeCidade}>{dadosClima.name}, {dadosClima.sys.country}</Text>
        <Image style={styles.iconeClima} source={{uri : }} />

      </View>
    )}
  </View>

);


const styles = StyleSheet.create({

});
