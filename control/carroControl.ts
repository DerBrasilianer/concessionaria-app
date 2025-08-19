import { useState } from 'react';
import { Carro } from '../model/carro';
import { salvarCarro } from '../service/carroService';

const useCarroControl = () => {
    const [carro, setCarro] = useState<Carro>({
        id: 0,
        ano: 0,
        placa: "",
        modelo: ""
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");
    const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | "">("");
    const [camposInvalidos, setCamposInvalidos] = useState<{ [K in keyof Carro]?: boolean }>({});

    const salvar = () => {
        const novosInvalidos: { [K in keyof Carro]?: boolean } = {};

        if (!carro.id) novosInvalidos.id = true;
        if (!carro.ano) novosInvalidos.ano = true;
        if (carro.placa.trim() === "") novosInvalidos.placa = true;
        if (carro.modelo.trim() === "") novosInvalidos.modelo = true;

        setCamposInvalidos(novosInvalidos);

        if (Object.keys(novosInvalidos).length > 0) {
            setMensagem("Preencha todos os campos antes de salvar.");
            setTipoMensagem("erro");
            return;
        }

        setLoading(true);
        salvarCarro(carro)
            .then(() => {
                setMensagem("Carro foi gravado com sucesso");
                setTipoMensagem("sucesso");
                setCamposInvalidos({});
            })
            .catch((erro: any) => {
                setMensagem("Erro ao gravar o carro: " + erro);
                setTipoMensagem("erro");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlerInput = (texto: string, nomeCampo: keyof Carro) => {
        const novoCarro: Carro = { ...carro };

        if (nomeCampo === "id" || nomeCampo === "ano") {
            novoCarro[nomeCampo] = Number(texto) as any;
        } else {
            novoCarro[nomeCampo] = texto as any;
        }

        setCarro(novoCarro);

        if (camposInvalidos[nomeCampo]) {
            setCamposInvalidos({ ...camposInvalidos, [nomeCampo]: false });
        }
    };

    return {
        carro,
        handlerInput,
        salvar,
        loading,
        mensagem,
        tipoMensagem,
        camposInvalidos
    };
};

export { useCarroControl };
