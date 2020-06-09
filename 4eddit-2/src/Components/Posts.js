//Falta colocar um estado Geral como visto na aula de segunda
//Falta fazer que os forms sejam controlados
// Falta implementar as funções de comentários e carma
//Falta Estilizar melhor os cards
//Falta colocar uma função que abra somente os comentários do card selecionado

import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconESconde from '@material-ui/icons/ExpandLess';
import IconMostra from '@material-ui/icons/ExpandMore';
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme.js";
import "../Pages/pages.css"
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useForm from "../hooks/Formulario"
import ComentAddIcon from '@material-ui/icons/AddComment';
import IconUp from '../img/flechaGostei.png'
import IconDown from '../img/flechaOdiei.png'
import ShareIcon from '@material-ui/icons/Share';

const IconeAvatar = styled(Avatar)`
    background-color: #ff782e;
    margin-right: 3%;
`
const IconeShare =styled(ShareIcon)`
    margin-right: 20vw;
    margin-left: 10vw;
`
const Comentarios = styled.section `
    display: ${props => props.isMostraComent ? 'flex' : 'none'};
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
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

const Posts = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [posts, setPosts] = useState([])
  const { form, onChange, resetForm } = useForm({
    comentario: '',
  });

  useEffect(() =>{
   pegaTarefas()
  }, [props.urlBase])

  const pegaTarefas = () => {
    const token = window.localStorage.getItem("token")
    axios
    .get(`${props.urlBase}/posts`, {
        headers: {
            Authorization: token
        }
    })
    .then(response => {
      setPosts(response.data.posts)
    })
    .catch(err => {
       console.log(err)
     });
  }


  const abreComentarios = () => {
      setExpanded(!expanded);
  };

  const submitForm = event => {
      event.preventDefault()
  }

  const gosteiPost = () =>{
      console.log('gostei')
  }

  const odieiPost = () => {
      console.log('odiei')
  }


  const mudaValorInput = event => {
      const {
          name,
          value
      } = event.target;
      onChange(name, value);
  };

  const adicionaPost = () =>{
    console.log('funcionou botão')
    resetForm()
  }

  const listaPosts = posts.map((post) =>{
      return <article className='posts'>
          <section className='cabecalho-post'>
            <IconeAvatar>{post.username.toUpperCase().substr(0, 1)}</IconeAvatar>
            {post.username}
          </section>
          
          <section className='conteudo-post'>
              <p className='titulo-post'>{post.title} </p>
              <p className='texto-post'>{post.text}</p>
          </section>

          <section className='icones-posts'>
            <img src={IconUp} alt={'Gostei'} className='icones-carma' onClick={gosteiPost}/>
            <Carma isCool={post.votesCount}>{post.votesCount}</Carma>
            <img src={IconDown} alt={'Odiei'} className='icones-carma' onClick={odieiPost}/>
            <IconeShare />
            <p classame='rodapé-post'>{post.commentsCount} {post.commentsCount === 1? 'Comentário' : 'Comentários'}</p>
            {expanded ? <IconESconde onClick={abreComentarios}/> : <IconMostra onClick={abreComentarios}/>}

          </section>

          <Comentarios isMostraComent={expanded}>
            <form onSubmit={submitForm}>
                <TextField
                    className={classes.inputPostagem}
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
                  className={classes.botaoPostagem}
                  onClick={adicionaPost}>
                  Enviar
                  <ComentAddIcon />
                </Button>
            </form>
            
            <p>Comentários</p>
          </Comentarios>

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