import { salvarApi, listarCarros } from '../fetcher/carroFetcher';
import { carroSchema, Carro } from '../model/carroSchema';

const salvarCarro = async (carro: Carro) => {
    try {
        await carroSchema.validate(carro, { abortEarly: false });

        const response = await listarCarros();
        const carrosExistentes: Carro[] = response.data ? Object.values(response.data) : [];

        const idDuplicado = carrosExistentes.find(c => c.id === carro.id);
        if (idDuplicado) {
            throw new Error("Já existe um carro com esse ID.");
        }

        return salvarApi(carro);
    } catch (error: any) {
        if (error.name === "ValidationError") {
            throw new Error(error.errors.join("\n"));
        }
        throw error;
    }
};

export { salvarCarro };
