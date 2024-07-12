import { theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
     paddingTop: 80,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    
  },
  header:{
    flexDirection: "row",
    width: "100%",
    justifyContent: "center"
  },

  loginContainer: {
    marginHorizontal: 16,
    height:700,
    width: "100%",
    justifyContent: "center",
    gap: 40
  },
  tituloSubtituloContainer:{
    gap: 16,
    width:"90%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf:"center"
  },
  titulo : {
    fontSize: theme.fontSize.titulo,
    color: theme.colors.primaryText,
    fontWeight: "bold",
    lineHeight: 24,

  }
  ,
  subtitulo : {
    fontSize: theme.fontSize.subtitulo,
    color: theme.colors.secondText,
    fontWeight: 500,
    lineHeight: 16
  },
  entradaUsuario:{
    gap: 16,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  input:{
    borderWidth: 1,
    borderColor: theme.colors.firstPlan,
    color: theme.colors.primaryText,
    minHeight: 30,
    width: "90%",
    borderRadius: 16,
    padding: 16
  },
  loginButtom: {
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
  },
  registroText:{
    fontSize: theme.fontSize.paragrafo,
    color: theme.colors.secondText,
  }
});