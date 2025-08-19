import { StatusBar } from 'expo-status-bar';
import { View, Text, Button } from 'react-native';
import CarroView from './view/CarroView';
import { ThemeProvider, useThemeApp } from './theme/ThemeContext';

const MainApp = () => {

  const { toggleTema, styles, tema } = useThemeApp();

  return (

    <View style={styles.container}>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Button title={tema === "light" ? "Tema Claro" : "Tema Escuro"} onPress={toggleTema} />
      </View>

      <StatusBar style="auto" />
      <CarroView />

    </View>

  );

}

export default function App() {

  return (

    <ThemeProvider>
      <MainApp />
    </ThemeProvider>

  );

}
