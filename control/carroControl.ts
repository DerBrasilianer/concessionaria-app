import { useState } from 'react';
import { Carro } from '../model/carroSchema';
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
        setLoading(true);
        salvarCarro(carro)
            .then(() => {
                setMensagem("Carro foi gravado com sucesso");
                setTipoMensagem("sucesso");
                setCamposInvalidos({});
            })
            .catch((erro: any) => {
                setMensagem("Erro ao gravar o carro: " + erro.message);
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
