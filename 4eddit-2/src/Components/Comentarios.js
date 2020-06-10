//Falta função para pegar comentários
//Falta ordenar por data
// Colocar as requisições da API num Hook
//Colocar as formatações de data e hora num hook

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ComentAddIcon from '@material-ui/icons/AddComment';
import axios from "axios";
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
    background-color: #feb059;
    margin-right: 3%;
    width: 10vw;
   height: 10vw;
    color: #415259;
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
    font-size: 1rem;
    margin: 0 5%;
`

const useStyles = makeStyles((theme) => ({
  inputComentario:{
    width: '99%',
    top: theme.spacing(1),
  },
  botaoComentario:{
    left: theme.spacing(25), 
    top: theme.spacing(1),
  }
}));

const SessaoComentarios = (props) =>{
    const classes = useStyles();
    const { form, onChange, resetForm } = useForm({
    comentario: '',
  });
  const [comentarios, setComentarios] = useState([
      {
          "userVoteDirection": 0,
          "id": "hRW0BBr0uu7luijXQgmZ",
          "createdAt": 1591741372440,
          "votesCount": 0,
          "username": "gisber",
          "text": "Great!"
      },
      {
          "userVoteDirection": 0,
          "id": "GNuoez434aFA7IjPby8K",
          "createdAt": 1591730549167,
          "votesCount": 0,
          "username": "teste",
          "text": "teste"
      }, {
          "userVoteDirection": 1,
          "id": "PvA5iyq6xnHKT7LFyg73",
          "username": "darvas",
          "text": "Texto do comentario aqui!",
          "votesCount": 1,
          "createdAt": 1591622964376
      }, {
          "userVoteDirection": 0,
          "id": "zKNLvP9WP9ePBYhcezfb",
          "createdAt": 1591730582649,
          "votesCount": 0,
          "username": "teste",
          "text": "teste2"
      }
  ]);

//  useEffect(() => {
//    pegaComent()
//  }, [props.baseUrl, props.id])
//
//  const pegaComent = () => {
//    const token = window.localStorage.getItem("token")
//    axios
//    .get(`${props.baseUrl}/posts/${props.id}`, {
//        headers: {
//            Authorization: token
//        }
//    })
//    .then(response => {
//    console.log(response.data)
//    })
//    .catch(err => {
//       console.log(err)
//     });
//  }

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

    const formataData = (dataEstranha)=> {    
        let dataFormatadaComprida
        let dataFormatadaFinal
        dataFormatadaComprida = new Date(dataEstranha)
        let dia = (dataFormatadaComprida.getDate() < 10 ? "0" : "") + dataFormatadaComprida.getDate();
        let mes = (dataFormatadaComprida.getMonth() + 1 < 10 ? "0" : "") + (dataFormatadaComprida.getMonth() + 1);
        let ano = dataFormatadaComprida.getYear() - 100;
        const novaData = dia + "/" + mes + "/" + ano
        dataFormatadaFinal = novaData;
        return dataFormatadaFinal
    }

    const formataHora = (dataEstranha) => {
        let dataFormatadaComprida
        let horaFormatada
        dataFormatadaComprida = new Date(dataEstranha)
        let hr = (dataFormatadaComprida.getHours() < 10 ? "0" : "") + dataFormatadaComprida.getHours();
        let min = (dataFormatadaComprida.getMinutes() < 10 ? "0" : "") + dataFormatadaComprida.getMinutes();
        const novaHora = hr + ":" + min
        horaFormatada = novaHora;
        return(horaFormatada)
    }

    const listaComent = comentarios.map((coment) => {
      return <article className='coments'>
            <IconeAvatar>{coment.username.toUpperCase().substr(0, 1)}</IconeAvatar>
            <section className='container-coment'>
                <section className='conteudo-coment'>
                    <p className="username-coment"> <b>{coment.username}:</b></p>
                    <p className='texto-coment'>"{coment.text}"</p>
                </section>
                
                <section className='data-coment'>
                    <p>{formataData(coment.createdAt)} </p>
                    <p>&nbsp; às {formataHora(coment.createdAt)}</p>
                </section>
                
                <section className='carma-coment'>
                  <img src={IconUp} alt={'Gostei'} className='icones-carma-coment' onClick={gosteiComent}/>
                  <Carma isCool={coment.votesCount}>{coment.votesCount}</Carma>
                  <img src={IconDown} alt={'Odiei'} className='icones-carma-coment' onClick={odieiComent}/>
                </section>
            </section>
        </article>
  })

    return(
        <Comentarios isMostraComent={props.isMostraComent}>
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