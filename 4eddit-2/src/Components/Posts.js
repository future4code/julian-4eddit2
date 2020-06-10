//Falta colocar um estado Geral como visto na aula de segunda
//Falta fazer que os forms sejam controlados
// Falta implementar as funções de comentários e carma
//Falta colocar uma função que abra somente os comentários do card selecionado
//Falta função para pegar comentários
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
import SessaoComentarios from './Comentarios'

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
`

const Posts = (props) => {
  const [posts, setPosts] = useState([])
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  const abreComentarios = () => {
    setExpanded(!expanded);
  };

  const gosteiPost = () =>{
      console.log('gostei')
  }

  const odieiPost = () => {
      console.log('odiei')
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

  const listaPosts = posts.map((post) =>{
      return <article className='posts'>
          <section className='cabecalho-post'>
            <IconeAvatar>{post.username.toUpperCase().substr(0, 1)}</IconeAvatar>
            <p className="username">{post.username}</p>
             <section className='data-post'>
                <p>{formataData(post.createdAt)} </p>
                <p>&nbsp; às {formataHora(post.createdAt)}</p>
              </section>
          </section>
          
          <section className='conteudo-post'>
              <p className='titulo-post'>{post.title} </p>
              <p className='texto-post'>"{post.text}"</p>
          </section>

          <section className='icones-posts'>
            <img src={IconUp} alt={'Gostei'} className='icones-carma' onClick={gosteiPost}/>
            <Carma isCool={post.votesCount}>{post.votesCount}</Carma>
            <img src={IconDown} alt={'Odiei'} className='icones-carma' onClick={odieiPost}/>
            <IconeShare />
            <p classame='rodapé-post'>{post.commentsCount} {post.commentsCount === 1? 'Comentário' : 'Comentários'}</p>
            {expanded ? <IconESconde onClick={abreComentarios}/> : <IconMostra onClick={abreComentarios}/>}
          </section>

          <SessaoComentarios isMostraComent={expanded} id={post.id} baseUrl={props.baseUrl}/>
      </article>
  })

  return (
    <MuiThemeProvider theme={theme}>
      <div className='tela-feed'>
        {listaPosts}
      </div>
    </MuiThemeProvider>
  );
};

export default Posts;