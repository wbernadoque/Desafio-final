import React, { useEffect, useState } from 'react';
import * as api from '../api/ApiService';
import css from '../components/Instagram.module.css';

export default function Instagram() {
  const [allFriends, setAllFriends] = useState([]);
  const [allPosts, setAllPosts]=useState([]);
  
  
  useEffect(() => {
    const getBestFriends = async () => {
      const friends = await api.getAllFriends();
      
      setAllFriends(friends);
    };

    const getAllPosts = async ()=>{
      const posts = await api.getAllPosts();
      setAllPosts(posts);

    }

    getBestFriends();
    getAllPosts();
    console.log(allPosts)
  });

  const handleFriendSelected = (friend)=>{
    
    console.log(friend.target.text)
  }
  return (
    <div>
      <h3>Instagram de Filme</h3>
        
<div>
  <img className={css.perfil} src={require("../img/superman.png")} />

</div>
        <div className={css.container}>
        <h3>Visualizar Timeline com:</h3>
      <div className={css.containerUsuarios}>
        {allFriends.map((friend, index) => {
          return (
            <a key={index} className={css.usuarios} onClick={handleFriendSelected}>
              <img className={css.perfil} src={require(`../img/${friend}.png`)} />
              {friend}
            </a>
          );
        })}

      </div>
        </div>
        <div>
          {allPosts.map(post=>{
            return(
              <div>

              <img className={css.picturePost} src={post.picture} />
              <span>{post.title}</span>
              </div>
            );
          })}

        </div>
    </div>
  );
}
