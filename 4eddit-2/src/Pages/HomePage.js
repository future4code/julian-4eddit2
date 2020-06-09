import React, { useState } from "react";
import { useHistory } from "react-router";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme.js";
import Logo from "../img/labeddit2.png"
import "./pages.css"
import SairIcon from '@material-ui/icons/ExitToApp';
import axios from "axios";
import useForm from "../hooks/Formulario"
import PostAddIcon from '@material-ui/icons/PostAdd';



const IconeSair = styled(SairIcon)`
  color: #feb059;
  && {
    :hover {
        color: #ff782e;
    }
  }
`
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  cardPostagem: {
    width: '100%',
  },
  inputPostagem:{
    width: '99%',
    top: theme.spacing(0),
    bottom: theme.spacing(-3),
  },
  botaoPostagem:{
    left: theme.spacing(25), 
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const HomePage = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { form, onChange, resetForm } = useForm({
    mensagem: '',
  });
  
  const submitForm = event => {
    event.preventDefault()
  }

  const mudaValorInput = event => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  const goToLoginPage = () => {
    history.push("/");
  };

  const adicionaPost = () =>{
    console.log('funcionou botão')
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className='tela-feed'>
        <AppBar id="cabecalho" color="secondary">
          <img id='logo-pequeno' src={Logo} alt={'logo'} />
          <IconeSair fontSize={'large'} onClick={goToLoginPage} />
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <Container>
          <Box my={2} id="conteudo-principal">
            <Card 
              id='card-postagem' 
              variant="outlined"
              className={classes.cardPostagem}
            >
              <CardContent>
                <form onSubmit={submitForm}> 
                  <TextField
                    className={classes.inputPostagem}
                    id="outlined-secondary"
                    label="Compartilhe algo"
                    variant="outlined"
                    color="secondary"
                    multiline
                    required
                    size="small"
                    name='senha'
                  value={form.senha}
                  onChange={mudaValorInput}
                  inputProps={{ 
                    pattern: "{5,300}",
                    title: "O texto deve ter entre 5 e 300 caracteres" }}
                  />
                  <Button 
                    color="primary"
                    className={classes.botaoPostagem}
                    onClick={adicionaPost}>
                    Enviar
                    < PostAddIcon />
                  </Button>
                </form>
              </CardContent>
                
            </Card>
          </Box>
        </Container>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>
    </MuiThemeProvider>
  );
};

export default HomePage;