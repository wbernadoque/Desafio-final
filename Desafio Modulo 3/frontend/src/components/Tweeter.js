import React, { useState } from 'react';
import Tweet from './Tweet';
import * as api from '../api/ApiService';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Tweeter() {
  const [allTweets, setAllTweets] = useState([]);
  const [tweetInsert, setTweetInsert] = useState([]);
  const [idTweet, setIdTweet] = useState([]);

  useEffect(() => {
    const getTweets = async () => {
      const tweets = await api.getAllTweets();

      setAllTweets(tweets);
    };

    getTweets();
    document.querySelector('textArea').focus();
  });

  const handleDelete = async (tweetToDelete) => {
    await api.deleteTweet(tweetToDelete);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const tweet = {
      id: idTweet,
      value: tweetInsert,
    };

    await api.insertTweet(tweet);
    document.querySelector('textarea').value = '';
    setTweetInsert('');
  };
  const handleChange = (tweet) => {
    // console.log(tweet.target.value);
    // console.log(tweet.target.id);
    setTweetInsert(tweet.target.value);
    setIdTweet(tweet.target.id);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value="Digite o que esta pensando: " />
        <textarea
          name="tweet"
          id={uuidv4()}
          cols="30"
          rows="10"
          placeholder="Digite aqui"
          onChange={handleChange}
          autofocus
        ></textarea>
        <button disabled={tweetInsert.length === 0 || tweetInsert.length > 280}>
          Tweetar
        </button>
        <span>{280 - tweetInsert.length} Caracteres restantes</span>
      </form>
      <div>
        <Tweet tweets={allTweets} onDelete={handleDelete} />
      </div>
    </div>
  );
}
