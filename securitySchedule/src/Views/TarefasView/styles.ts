import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 40,
  },
  cabecalho: {
    alignSelf: "flex-start",
  },
  titulo: {
    fontSize: theme.fontSize.titulo,
    color: theme.colors.primaryText,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
  },
  cardsContainers: {
    flex: 1,
    flexWrap: "wrap",
    gap: 16,
  },
  containerCard: {
    height: 150,
    width: 250,
    borderRadius: 24,
    backgroundColor: theme.colors.firstPlan,
  },
  cabecalhoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  tituloCard: {
    paddingTop: 16,
    fontSize: theme.fontSize.subtitulo,
    fontWeight: "bold",
    color: theme.colors.primaryText,
  },
  dataCard: {
    fontSize: theme.fontSize.subtitulo,
    color: theme.colors.secondText,
  },
  descricaoCard: {
    padding: 16,
    fontSize: theme.fontSize.paragrafo,
    color: theme.colors.secondText,
  },
  botaoAdicionar: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 40,
    bottom: 40,
    borderRadius: 999,
    backgroundColor: theme.colors.firstPlan,
    height: 60,
    width: 60,
  },
  botaoLogout: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 40,
    bottom: 40,
    borderRadius: 999,
    backgroundColor: theme.colors.firstPlan,
    height: 60,
    width: 60,
  },
  modal: {
    height: 200,
    width: "100%",
    alignSelf: "flex-end",
    borderColor: theme.colors.firstPlan
    
  },
  closeButton:{
    position:"absolute",
    left: 0 ,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.firstPlan,
    color: theme.colors.primaryText,
    minHeight: 30,
    width: "90%",
    borderRadius: 16,
    padding: 16,
  },
  modalContainer: {
    backgroundColor: theme.colors.background,
    padding: 22,
    height: "45%",
    width: "100%",
    gap: 16,
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "white"
  },
  cadastrarTaskButton:{
    backgroundColor: theme.colors.firstPlan,
    width: "40%",
    minHeight: 40,
    borderRadius: 16,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText:{
    color: theme.colors.primaryText,
    fontWeight: "bold"
  }
});
