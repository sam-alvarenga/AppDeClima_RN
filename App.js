import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Image } from 'react-native';
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
      const response = await axios.get(API_URL_BASE, {
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
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Previsão do Tempo</Text>

      <TextInput style={styles.input} placeholder="Digite o nome da cidade"
        value={cidade} //O valor exibido no TExtInput é controlado pelo estado 'cidade'.
        onChangeText={setCidade} //Quando o texto no TextInput muda, a função 'setCidade' é chmada par atualizar o estado 'cidade'.
      />
      {/* FInm do componente TextInput */}

      <Button title='Buscar Clima' onPress={buscarClima} disabled={carregando}></Button>

      {carregando && <ActivityIndicator style={styles.info} size="large" color="#0000ff" />}

      {erro && <Text style={styles.erro}>{erro}</Text>}

      {dadosClima && (
        <View style={styles.climaContainer}>

          <Text style={styles.nomeCidade}>{dadosClima.name}, {dadosClima.sys.country}</Text>
          <Image style={styles.iconeClima} source={{ uri: `https://openweathermap.org/img/wn/${dadosClima.weather[0].icon}@2x.png` }} />
          <Text style={styles.temperatura}>{dadosClima.main.temp}°C</Text>
          <Text style={styles.descricao}>{dadosClima.weather[0].description}</Text>

          {/* Exibi a sensação termica (dadosClima.main.feels_like) */}
          <Text style={styles.info}>Sensação Térmica{dadosClima.main.feels_like}°C</Text>
          {/*Exibi a umidade (dadosClima.main.humidity)  */}
          <Text style={styles.info}>Umidade:{dadosClima.main.humidity}</Text>
          {/* Exibi a velocidade do vento (dadosClima.wind.speed) */}
          <Text style={styles.info}>Vento: {dadosClima.wind.speed} m/s</Text>
        </View>
      )}
    </View>

  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alterado para flex-start para dar espaço ao conteúdo
    paddingTop: 80, // Aumentado para evitar sobreposição com a status bar e dar margem
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '100%', // Ocupar a largura total
    fontSize: 16,
  },
  climaContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: '100%', // Ocupar a largura total
  },
  nomeCidade: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconeClima: {
    width: 100,
    height: 100,
  },
  temperatura: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ff8c00',
  },
  descricao: {
    fontSize: 20,
    textTransform: 'capitalize',
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
  },
  erro: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  }
});

