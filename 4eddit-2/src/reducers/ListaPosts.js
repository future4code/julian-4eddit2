export const initialState = {
  comentarios: [],
  posts:[]
};

export const listaReducer = (state, action) => {
  switch (action.type) {
    case 'PEGA_POSTS':
        const listaDePosts = [action.posts]
         return { ...state, posts: listaDePosts };
    case 'PEGA_COMENTARIOS':
        const listaDeComentarios = [action.comentarios]
        return listaDeComentarios;
    default:
      return { ...state, comentarios: listaDeComentarios};
  }
};
