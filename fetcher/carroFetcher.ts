import axios from 'axios';
import { Carro } from '../model/carro';

const FIREBASE_DB_URL = 'https://projeto-concessionaria-default-rtdb.firebaseio.com';

const salvarApi = (carro: Carro) => {
    return axios.post(`${FIREBASE_DB_URL}/carro.json`, carro);
};

const listarCarros = () => {
    return axios.get(`${FIREBASE_DB_URL}/carro.json`);
};

export { salvarApi, listarCarros };
