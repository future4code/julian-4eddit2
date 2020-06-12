import axios from "axios";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit';
const token = window.localStorage.getItem("token")

const buscaComentarios = () => ({
  type: "PEGA_COMENTARIOS",
});

export const pegaComentarios = (id) => async (dispatch) => {
  const token = window.localStorage.getItem("token")
    try {
    const response = await axios.get(
      `${baseUrl}/posts/${id}`,{
        headers: {
           Authorization: token
        },
      }
    );
    dispatch(buscaComentarios(response.data.post.comments));
  } catch (err) {
    console.log(err);
  }
};

export const adicionaComent = (text, id) => async (dispatch) => {
    const body = { text };
    if(body.text === ''){
      alert('Digite uma Comentário');
    }else {
      try {
        const response = await axios.post(`${baseUrl}/posts/${id}/comment`, body, {
          headers: {
            Authorization: token
          }
        });
        console.log(response)
        dispatch(pegaComentarios(id));
        } catch (err) {
            console.log(err);
        }
    }
};

export const votoComentario = (idComent, idPost, direction) => async (dispatch) => {
  const body = {direction};
    try {
    const response = await axios.put(`${baseUrl}/posts/${idPost}/comment/${idComent}/vote`, body, {
        headers: {
            Authorization: token
        }
    });
    console.log(response.data)
    dispatch(pegaComentarios(idComent));
  } catch (err) {
    console.log(err);
  }
};
