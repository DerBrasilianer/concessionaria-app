import { salvarApi, listarCarros } from '../fetcher/carroFetcher';
import { Carro } from '../model/carro';

const salvarCarro = async (carro: Carro) => {
    const response = await listarCarros();
    const carrosExistentes: Carro[] = response.data ? Object.values(response.data) : [];

    const idDuplicado = carrosExistentes.find(c => c.id === carro.id);
    if (idDuplicado) {
        throw new Error("Já existe um carro com esse ID.");
    }

    return salvarApi(carro);
};

export { salvarCarro };
