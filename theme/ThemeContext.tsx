import React, { createContext, useContext, useState, ReactNode } from "react";
import { StyleSheet } from "react-native";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  tema: ThemeType;
  toggleTema: () => void;
  styles: any;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tema, setTema] = useState<ThemeType>("light");

  const toggleTema = () => {
    setTema((prev) => (prev === "light" ? "dark" : "light"));
  };

  const styles = tema === "light" ? stylesLight : stylesDark;

  return (
    <ThemeContext.Provider value={{ tema, toggleTema, styles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeApp = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeApp precisa estar dentro de ThemeProvider");
  return context;
};

const stylesLight = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16 },
  label: { fontSize: 16, color: "navy", marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "navy", marginBottom: 12, padding: 8, borderRadius: 6, color: "black" },
  button: { marginTop: 12 },
  text: { color: "black" },
});

const stylesDark = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  label: { fontSize: 16, color: "#FFD700", marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#FFD700", marginBottom: 12, padding: 8, borderRadius: 6, color: "white" },
  button: { marginTop: 12 },
  text: { color: "white" },
});
