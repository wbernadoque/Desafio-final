import React from 'react';

export default function Tweet({ tweets, onDelete }) {
  const handleClick = (tweets) => {
    onDelete(tweets.target.id);
  };

  return (
    <div>
      <tbody>
        {tweets.map((tweet) => {
          return (
            <tr key={tweet.id}>
              <td>{tweet.value}</td>
              <span
                id={tweet.id}
                className="material-icons"
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={handleClick}
              >
                delete
              </span>
            </tr>
          );
        })}
      </tbody>
    </div>
  );
}
