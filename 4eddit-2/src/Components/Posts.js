//Falta colocar um estado Geral como visto na aula desta semana
//Falta fazer que os forms sejam controlados
//Falta ordenar por data
// Colocar as requisições da API num Hook
//Colocar as formatações de data e hora num hook


import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconESconde from '@material-ui/icons/ExpandLess';
import IconMostra from '@material-ui/icons/ExpandMore';
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme.js";
import "../Pages/pages.css"
import styled from 'styled-components';
import IconUp from '../img/flechaGostei.png'
import IconDown from '../img/flechaOdiei.png'
import ShareIcon from '@material-ui/icons/Share';
import SessaoComentarios from './Comentarios';
import axios from "axios";

const IconeAvatar = styled(Avatar)`
    background-color: #ff782e;
    margin-right: 3%;
`
const IconeShare =styled(ShareIcon)`
    margin-right: 20vw;
    margin-left: 10vw;
`

const Carma =styled.p`
  color: ${props => {
      if (props.isCool === 0){
          return '#415259'
      }else if(props.isCool > 0){
          return '#0d9201'
      }else{
          return '#ff0000'
      }
  }};
  font-weight: bold;
  margin: 0 2%;
`

const Posts = (props) => {
  const [posts, setPosts] = useState([])
  const [expanded, setExpanded] = useState(false);

  const abreComentarios = () => {
    setExpanded(!expanded);
  };

  const gosteiPost = (id) => {
    const token = window.localStorage.getItem("token")
    const body ={      
      direction: 1,
    };
    axios
    .put(`${props.baseUrl}/posts/${id}/vote`, body, {
        headers: {
          Authorization: token
        }
      })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const odieiPost = (id) => {
    const token = window.localStorage.getItem("token")
    const body ={      
      direction: -1,
    };
    axios
    .put(`${props.baseUrl}/posts/${id}/vote`, body, {
        headers: {
          Authorization: token
        }
      })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const formataData = (dataEstranha) => {
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
    return (horaFormatada)
  }

  return (
    <MuiThemeProvider theme={theme}>
        <article className='posts'>
          <section className='cabecalho-post'>
            <section className="identif-post">
              <IconeAvatar>{props.post.username.toUpperCase().substr(0, 1)}</IconeAvatar>
              <p className="username">{props.post.username}</p>
            </section>
             <section className='data-post'>
                <p>{formataData(props.post.createdAt)} </p>
                <p>&nbsp; às {formataHora(props.post.createdAt)}</p>
              </section>
          </section>
          
          <section className='conteudo-post'>
              <p className='titulo-post'>{props.post.title} </p>
              <p className='texto-post'>"{props.post.text}"</p>
          </section>

          <section className='icones-posts'>
            <img src={IconUp} alt={'Gostei'} className='icones-carma' onClick={() => gosteiPost(props.post.id)}/>
            <Carma isCool={props.post.votesCount}>{props.post.votesCount}</Carma>
            <img src={IconDown} alt={'Odiei'} className='icones-carma' onClick={() => odieiPost(props.post.id)}/>
            <IconeShare />
            <p classame='rodapé-post'>{props.post.commentsCount} {props.post.commentsCount === 1? 'Comentário' : 'Comentários'}</p>
            {expanded ? <IconESconde onClick={abreComentarios}/> : <IconMostra onClick={abreComentarios}/>}
          </section>

          <SessaoComentarios isMostraComent={expanded} id={props.post.id} baseUrl={props.baseUrl}/>
        </article>
    </MuiThemeProvider>
  );
};

export default Posts;