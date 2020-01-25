import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import { ColumnContent } from '../types';
import { Palette } from '../../../Theme';
import useTranslations from '../../../translations';
import { Post } from 'retro-board-common';
import { countVotes, sortPostByVote } from '../utils';

interface DisplayViewProps {
  columns: ColumnContent[];
}

interface SectionProps {
  column: ColumnContent;
}

const Section = ({ column }: SectionProps) => (
  <Grid container spacing={4} component="section" role="list">
    <Grid item xs={12}>
      <h1>{column.label}</h1>
      {column.posts.length ? (
        <PostsList posts={column.posts} />
      ) : (
          <Typography variant="body1">No posts in this category.</Typography>
        )}
    </Grid>
  </Grid>
);

interface PostsListProps {
  posts: Post[];
}

const PostsList = ({ posts }: PostsListProps) => {
  const sortedList = useMemo(() => {
    return [...posts].sort(sortPostByVote);
  }, [posts]);
  return (
    <>
      {sortedList.map(post => (
        <PostLine post={post} key={post.id} />
      ))}
    </>
  );
};

interface PostLineProps {
  post: Post;
}

const PostLine = ({ post }: PostLineProps) => {
  const likes = useMemo(() => countVotes(post, 'like'), [post]);
  const dislikes = useMemo(() => countVotes(post, 'dislike'), [post]);
  return (
    <Typography component="div">
      <PostContainer role="listitem">
        <Score>
          <PositiveNumber>+{likes}</PositiveNumber>&nbsp;
          <NegativeNumber>-{dislikes}</NegativeNumber>
        </Score>&nbsp;&nbsp;
        <PostContent aria-label="post content">{post.content}</PostContent>
      </PostContainer>
    </Typography>
  );
};

const PostContainer = styled.div`
  display: inline-block;
  color: black;
`;

const Score = styled.div`
  margin-right: 10px;
  border: 2px solid red;
  max-width: 100px;
  display: inline-block;
`;

const PositiveNumber = styled.span`
  color: ${Palette.positive};
`;

const NegativeNumber = styled.span`
  color: ${Palette.negative};
`;

const PostContent = styled.span`
border: 2px solid blue;
  white-space: pre-wrap;
  display: inline-block;
`;

const ActionsList = ({ posts }: PostsListProps) => {
  const {
    Actions: { summaryTitle },
  } = useTranslations();
  return (
    <Grid
      container
      spacing={4}
      component="section"
      role="list"
      style={{ marginTop: 30 }}
    >
      <Grid item xs={12}>
        <h1>{summaryTitle}</h1>
        <dl>
          {posts.map(post => (
            <React.Fragment key={post.id}>
              <dt>{post.action}</dt>
              <dd>{post.content}</dd>
            </React.Fragment>
          ))}
        </dl>
      </Grid>
    </Grid>
  );
};

const DisplayView: React.SFC<DisplayViewProps> = ({ columns }) => {
  const posts = useMemo(() => {
    return columns.reduce<Post[]>((prev, current) => {
      return [...prev, ...current.posts.filter(post => !!post.action)];
    }, []);
  }, [columns]);
  return (
    <div>
      <div>
        {columns.map(column => (
          <Section key={column.index} column={column} />
        ))}
        {posts.length ? <ActionsList posts={posts} /> : null}
      </div>
    </div>
  );
};

export default DisplayView;
