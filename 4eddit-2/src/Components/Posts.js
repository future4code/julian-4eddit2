//Colocar as formatações de data e hora num hook

import React, { useState, useContext } from "react";
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
import ListaPostsContext from '../contexts/ListaPostsContext';
import { votoPost } from "../actions/ApiPosts"

const IconeAvatar = styled(Avatar)`
    background-color: #ff782e;
    margin-right: 3%;
`
const IconeShare =styled(ShareIcon)`
    margin-right: 15vw;
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
  const postContext = useContext(ListaPostsContext);
  const [expanded, setExpanded] = useState(false);
  const abreComentarios = () => {
    setExpanded(!expanded);
  };


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
            <IconeAvatar>{postContext.posts.username === undefined ? "An" : postContext.posts.username.toUpperCase().substr(0, 1)}</IconeAvatar>
              <p className="username">{postContext.posts.username}</p>
            </section>
             <section className='data-post'>
                <p>{formataData(postContext.posts.createdAt)} </p>
                <p>&nbsp; às {formataHora(postContext.posts.createdAt)}</p>
              </section>
          </section>
          
          <section className='conteudo-post'>
              <p className='titulo-post'>{postContext.posts.title} </p>
              <p className='texto-post'>"{postContext.posts.text}"</p>
          </section>

          <section className='icones-posts'>
            <img src={IconUp} alt={'Gostei'} className='icones-carma' onClick={() => votoPost(postContext.posts.id, 1)}/>
            <Carma isCool={postContext.posts.votesCount}>{postContext.posts.votesCount}</Carma>
            <img src={IconDown} alt={'Odiei'} className='icones-carma' onClick={() => votoPost(postContext.posts.id, -1)}/>
            <IconeShare />
            <p classame='rodapé-post'>{postContext.posts.commentsCount} {postContext.posts.commentsCount === 1? 'Comentário' : 'Comentários'}</p>
            {expanded ? <IconESconde onClick={abreComentarios}/> : <IconMostra onClick={abreComentarios}/>}
          </section>

          <SessaoComentarios isMostraComent={expanded} postId={postContext.posts.id}/>
        </article>
    </MuiThemeProvider>
  );
};

export default Posts;