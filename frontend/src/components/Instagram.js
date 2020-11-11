import React, { useEffect, useState } from 'react';
import * as api from '../api/ApiService';
import css from '../components/Instagram.module.css';

export default function Instagram() {
  const [allFriends, setAllFriends] = useState([]);
  useEffect(() => {
    const getBestFriends = async () => {
      const friends = await api.getAllFriends();

      setAllFriends(friends);
    };
    getBestFriends();
  });
  return (
    <div>
      <h3>Instagram de Filme</h3>
      <div className={css.containerUsuarios}>
        {allFriends.map((friend, index) => {
          return (
            <button key={index} className={css.usuarios}>
              <img src={require(`../img/${friend}.png`)} />
              {friend}
            </button>
          );
        })}
      </div>
    </div>
  );
}
