import axios from 'axios';

const API_POSTS = 'http://localhost:3001/posts';
const API_COMMENTS = 'http://localhost:3001/comments';
const API_FRIENDS = 'http://localhost:3001/bestFriends';

async function getAllPosts() {
  const res = await axios.get(API_POSTS);
  const posts = res.data.map((post) => {
    return {
      id: post.id,
      user: post.user,
      title: post.title,
      picture: post.picture,
    };
  });

  return posts;
}

async function getAllComments() {
  const res = await axios.get(API_COMMENTS);
  const comments = res.data.map((comment) => {
    return {
      id: comment.id,
      user: comment.user,
      comment: comment.comment,
      postId: comment.postId,
    };
  });

  return comments;
}
async function getAllFriends() {
  const res = await axios.get(API_FRIENDS);
  const friends = res.data.map((friend) => {
    return friend;
  });

  return friends;
}



export { getAllPosts, getAllComments, getAllFriends };
