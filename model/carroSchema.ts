import * as yup from "yup";

export const carroSchema = yup.object({

  id: yup
    .number()
    .integer("O ID deve ser um número inteiro")
    .notRequired(),

  ano: yup
    .number()
    .required("O ano é obrigatório")
    .positive("O ano deve ser um número positivo"),
    
  placa: yup
    .string()
    .required("A placa é obrigatória")
    .min(5, "A placa deve ter no mínimo 5 caracteres"),
  
  modelo: yup.string().required("O modelo é obrigatório"),

});

export type Carro = yup.InferType<typeof carroSchema>;
