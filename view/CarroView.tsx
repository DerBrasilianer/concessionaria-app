import { View, Text, TextInput, Button, ActivityIndicator, Modal, TextStyle } from 'react-native';
import { useCarroControl } from '../control/carroControl';
import { useThemeApp } from '../theme/ThemeContext';

const CarroView: React.FC = () => {
    const { loading, carro, handlerInput, salvar, mensagem, tipoMensagem, camposInvalidos } = useCarroControl();
    const { styles } = useThemeApp();

    const estiloMensagem: TextStyle =
        tipoMensagem === "sucesso"
            ? {
                borderWidth: 1,
                borderColor: "green",
                backgroundColor: "#4CAF50",
                color: "white",
                padding: 8,
                borderRadius: 6,
                marginTop: 12,
                textAlign: "center"
            }
            : tipoMensagem === "erro"
                ? {
                    borderWidth: 1,
                    borderColor: "red",
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: 8,
                    borderRadius: 6,
                    marginTop: 12,
                    textAlign: "center"
                }
                : {};

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }]}>
                Cadastro da Concessionária
            </Text>

            <Text style={styles.label}>ID:</Text>
            <TextInput
                value={carro.id ? carro.id.toString() : ""}
                onChangeText={(txt: string) => handlerInput(txt, "id")}
                keyboardType="numeric"
                style={[
                    styles.input,
                    camposInvalidos.id && { borderColor: "red", borderWidth: 2 }
                ]}
            />

            <Text style={styles.label}>Ano:</Text>
            <TextInput
                value={carro.ano ? carro.ano.toString() : ""}
                onChangeText={(txt: string) => handlerInput(txt, "ano")}
                keyboardType="numeric"
                style={[
                    styles.input,
                    camposInvalidos.ano && { borderColor: "red", borderWidth: 2 }
                ]}
            />

            <Text style={styles.label}>Placa:</Text>
            <TextInput
                value={carro.placa}
                onChangeText={(txt: string) => handlerInput(txt, "placa")}
                style={[
                    styles.input,
                    camposInvalidos.placa && { borderColor: "red", borderWidth: 2 }
                ]}
            />

            <Text style={styles.label}>Modelo:</Text>
            <TextInput
                value={carro.modelo}
                onChangeText={(txt: string) => handlerInput(txt, "modelo")}
                style={[
                    styles.input,
                    camposInvalidos.modelo && { borderColor: "red", borderWidth: 2 }
                ]}
            />

            <Button title="Salvar" onPress={salvar} />

            {mensagem !== "" && (
                <Text style={[styles.text, estiloMensagem]}>
                    {mensagem}
                </Text>
            )}

            <Modal visible={loading} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </Modal>
        </View>
    );
};

export default CarroView;
