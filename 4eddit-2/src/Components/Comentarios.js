import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ComentAddIcon from '@material-ui/icons/AddComment';
import axios from "axios";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme.js";
import "../Pages/pages.css"
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import useForm from "../hooks/Formulario"
import IconUp from '../img/flechaGostei.png'
import IconDown from '../img/flechaOdiei.png'
import Avatar from '@material-ui/core/Avatar';

const Comentarios = styled.section `
    display: ${props => props.isMostraComent ? 'flex' : 'none'};
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
`
const IconeAvatar = styled(Avatar)`
    background-color: #ff782e;
    margin-right: 3%;
    width: 5vw;
`

const Carma = styled.p `
    color: ${props => {
        if (props.isCool === 0){
            return '#415259'
        }else if(props.isCool > 0){
            return '#0d9201'
        }else{
            return '#ff0000'
        }
    }};
`

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  cardComentario: {
    width: '100%',
  },
  inputComentario:{
    width: '99%',
    top: theme.spacing(0),
    bottom: theme.spacing(-3),
  },
  botaoComentario:{
    left: theme.spacing(25), 
  }
}));

const SessaoComentarios = (props) =>{
    const classes = useStyles();
    const [comentarios, setComentarios] = useState({});
    const { form, onChange, resetForm } = useForm({
    comentario: '',
  });

  useEffect(() => {
    pegaComent()
  }, [props.baseUrl])

  const pegaComent = () => {
    const token = window.localStorage.getItem("token")
    axios
    .get(`${props.baseUrl}/posts/${props.id}`, {
        headers: {
            Authorization: token
        }
    })
    .then(response => {
    console.log(response.data)
    })
    .catch(err => {
       console.log(err)
     });
  }

    const submitForm = event => {
        event.preventDefault()
    }

    const gosteiComent = () =>{
        console.log('gostei')
    }

    const odieiComent = () => {
        console.log('odiei')
    }

    const mudaValorInput = event => {
      const { name, value } = event.target;
      onChange(name, value);
    };

    const adicionaComent = () => {
        console.log('funcionou botão')
        resetForm()
    }

    const listaComent = comentarios.map((coment) => {
      return <article className='coments'>
          <section className='cabecalho-coment'>
            <IconeAvatar>{coment.username.toUpperCase().substr(0, 1)}</IconeAvatar>
            <p className="username">{coment.username}</p>

          </section>
          
          <section className='conteudo-coment'>
              <p className='texto-coment'>"{coment.text}"</p>
          </section>

          <section className='icones-coment'>
            <img src={IconUp} alt={'Gostei'} className='icones-carma' onClick={gosteiComent}/>
            <Carma isCool={coment.votesCount}>{coment.votesCount}</Carma>
            <img src={IconDown} alt={'Odiei'} className='icones-carma' onClick={odieiComent}/>
          </section>
      </article>
  })

    return(
        <Comentarios>
            <form onSubmit={submitForm}>
                <TextField
                    className={classes.inputComentario}
                    id="outlined-secondary"
                    label="Insira um comentário"
                    variant="outlined"
                    color="secondary"
                    multiline
                    required
                    size="small"
                    name='senha'
                    value={form.senha}
                    onChange={mudaValorInput}
                    inputProps={{ 
                      pattern: "{5,100}",
                      title: "O texto deve ter entre 5 e 100 caracteres" }}
                />
                <Button 
                  color="primary"
                  className={classes.botaoComentario}
                  onClick={adicionaComent}>
                  Enviar
                  <ComentAddIcon />
                </Button>
            </form>
            
            {listaComent}
        </Comentarios>
    );
}

export default SessaoComentarios
