import React, { useEffect, useState } from 'react';
import * as api from '../api/ApiService';
import css from '../components/Instagram.module.css';
import { v4 as uuidv4 } from 'uuid';

export default function Instagram() {
  const [allFriends, setAllFriends] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [comentario, setComentario] = useState(null);
  const [postComment, setPostComment] = useState(null);
  const [selectedUser, setSelectedUser] = useState('batman');

  const getComments = async () => {
    const comments = await api.getAllComments();
    setAllComments(comments);
  };
  const getLikes = async () => {
    const likes = await api.getAllLikes();

    setAllLikes(likes);
  };

  const getBestFriends = async () => {
    const friends = await api.getAllFriends();

    setAllFriends(friends);
  };

  const getAllPosts = async () => {
    const posts = await api.getAllPosts();
    setAllPosts(posts);
  };

  useEffect(() => {
    getBestFriends();
    getAllPosts();
    getComments();
    getLikes();
  }, []);

  const countLikes = (postId) => {
    let i = 0;
    allLikes.map((like) => {
      if (like.postId === postId) {
        i++;
      }
    });
    return i;
  };
  const countComments = (postId) => {
    let i = 0;
    allComments.map((comment) => {
      if (comment.postId === postId) {
        i++;
      }
    });
    return i;
  };
  const likesUsers = (postId) => {
    let usersLiked = '';
    allLikes.map((like) => {
      if (like.postId === postId) {
        usersLiked += like.user;
        usersLiked += ' \n';
      }
    });
    return usersLiked;
  };

  const handleChange = (event) => {
    // comentario = event.target.value;
    // postComment = event.target.id;
    setComentario(event.target.value);
    setPostComment(event.target.id);
  };

  const handleSubmit = async () => {
    const comment = {
      id: uuidv4(),
      comment: comentario,
      postId: postComment,
      user: selectedUser,
    };

    await api.setComment(comment);
    const elements = document.getElementsByName('comentario');
    elements.forEach((element) => {
      element.value = '';
    });

    getComments();
  };
  const setLike = async (post) => {
    const like = {
      id: uuidv4(),
      postId: post,
      user: selectedUser,
    };

    await api.setLike(like);
    getLikes();
  };
  const deleteLike = async (likeId) => {
    await api.deleteLike(likeId[0].id);
    getLikes();
  };
  useEffect(() => {}, [comentario]);

  const likeFilter = (post) => {
    const liked = allLikes.filter((like) => like.postId == post);
    const userLiked = liked.filter((like) => like.user == selectedUser);
    if (userLiked.length > 0) {
      return 'favorite';
    } else {
      return 'favorite_border';
    }
  };
  const handleClick = (post) => {
    const liked = allLikes.filter((like) => like.postId == post);
    const userLiked = liked.filter((like) => like.user == selectedUser);

    if (userLiked.length <= 0) {
      setLike(post);
    } else {
      deleteLike(userLiked);
    }
  };

  return (
    <div className={css.corpo}>
      <h3>Instagram de Filme</h3>

      <div className={css.topoInfo}>
        <div className={css.perfilUsuario}>
          <img
            className={css.perfil}
            src={require('../img/superman.png')}
            alt=""
          />
          <div className={css.info}>
            <span>{allPosts.length} Posts</span>
            <span>{allComments.length} comentarios</span>
            <span>{allLikes.length} likes</span>
          </div>
        </div>
        <div className={css.container}>
          <h3>Visualizar Timeline com:</h3>
          <div className={css.containerUsuarios}>
            <a
              className={
                selectedUser === 'superman' ? css.usuariosClick : css.usuarios
              }
              onClick={() => {
                setSelectedUser('superman');
              }}
              id="superman"
            >
              <img
                className={css.perfil}
                src={require(`../img/superman.png`)}
                alt=""
              />
              superman
            </a>
            {allFriends.map((friend, index) => {
              return (
                <a
                  key={index}
                  className={
                    selectedUser === friend ? css.usuariosClick : css.usuarios
                  }
                  onClick={() => {
                    setSelectedUser(friend);
                  }}
                  id={friend}
                >
                  <img
                    className={css.perfil}
                    src={require(`../img/${friend}.png`)}
                    alt=""
                  />
                  {friend}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {allPosts.map((post, index) => {
          return (
            <div key={index} className={css.post}>
              <img className={css.picturePost} src={post.picture} alt="" />
              <div>
                <div className={css.detalhePost}>
                  <img src={require(`../img/${post.user}.png`)} alt="" />
                  <span>{post.title}</span>
                </div>
                <div className={css.likeComments}>
                  <i
                    className={`material-icons ${css.like}`}
                    title={likesUsers(post.id)}
                    onClick={() => handleClick(post.id)}
                  >
                    {/* favorite_border */}
                    {allLikes.length > 0 && likeFilter(post.id)}
                  </i>

                  <span>{countLikes(post.id)}</span>

                  <i className="material-icons">message</i>
                  <span>{countComments(post.id)}</span>
                </div>

                <div className={css.comentarios}>
                  {allComments.map((comment) => {
                    if (comment.postId === post.id) {
                      return (
                        <div className={css.comentario} key={comment.id}>
                          <img
                            src={require(`../img/${comment.user}.png`)}
                            alt=""
                          />
                          <span>{comment.comment}</span>
                        </div>
                      );
                    }
                  })}
                  <div className={css.sendComment}>
                    <input
                      placeholder="Comentar..."
                      type="text"
                      onChange={handleChange}
                      id={post.id}
                      name="comentario"
                    ></input>
                    <a className="material-icons" onClick={handleSubmit}>
                      send
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}
