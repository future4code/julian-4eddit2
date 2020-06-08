import React, { useState} from "react";
import { useHistory } from "react-router";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme.js";
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import "./pages.css"
import Logo from "../img/labeddit.png"
import useForm from "../hooks/Formulario"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
   
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  botao:{
    width: '20ch',
    margin: '3ch 0',
  }
}));


const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [mostraSenha, setMostraSenha] = useState(false);
  
  const { form, onChange, resetForm } = useForm({
    user: '',
    password: '',
  });

  const submitForm = event => {
    event.preventDefault()
  }

  const mudaValorInput = event => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  const handleClickShowPassword = () => {
    setMostraSenha(!mostraSenha);
  };

  const goToRegistroPage = () => {
    history.push("/registro");
    resetForm();
  };



  return (
    <MuiThemeProvider theme={theme}>
      <div className="tela-toda">
        <img id="logo-grande" src={Logo} alt={'Logo'} />
        <h1>Bem-vindo ao Labeddit</h1>
        <h3>Entre para continuar</h3>
        
  
       <form className="formulario" onSubmit={submitForm}>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Usuário</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                required
                name='user'
                type={'text'}
                value={form.user}
                onChange={mudaValorInput}
                endAdornment={
                  <InputAdornment position="end">
                    <AccountCircle color="secondary"/>
                  </InputAdornment>
                }
              />
            </FormControl>
                 
          
          <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Senha</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                required
                type={mostraSenha ? 'text' : 'password'}
                value={form.password}
                name="password"
                onChange={mudaValorInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {mostraSenha ? <Visibility color="secondary" /> : <VisibilityOff color="secondary"/>}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
  
            <Fab variant="extended" color="secondary" aria-label="add" className={clsx(classes.margin, classes.botao)}>
              Entre &nbsp;
              <SendIcon className={classes.extendedIcon} />                
            </Fab>
       </form>
  
          <h4>Nao tem conta? </h4>
          <a onClick={goToRegistroPage}> Criar aqui!</a>
         
        </div>
    </MuiThemeProvider>
  );
};

export default LoginPage;