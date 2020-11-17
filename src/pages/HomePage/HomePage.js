import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getPosts } from "../../WebAPI";

import { Link } from "react-router-dom";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid black;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const PostTitle = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 24px;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const Post = ({ post }) => {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
};

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Root>
  );
};

export default HomePage;
