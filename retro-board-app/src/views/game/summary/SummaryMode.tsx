import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from '@material-ui/core';
import { Feedback } from '@material-ui/icons';
import { ColumnContent } from '../types';
import { Palette } from '../../../Theme';
import useTranslations from '../../../translations';
import { Post, PostGroup } from 'retro-board-common';
import { countVotes, sortPostByVote } from '../utils';
import { Page } from '../../../components/Page';
import SpeedDial from './SpeedDial';
import { calculateSummary } from './calculate-summary';
import { ColumnStats, ColumnStatsItem } from './types';

interface SummaryModeProps {
  columns: ColumnContent[];
}

interface SectionProps {
  stats: ColumnStats;
}

const Section = ({ stats }: SectionProps) => (
  <Grid container spacing={4} component="section" role="list">
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" style={{ fontWeight: 300 }}>
              {stats.column.label}
            </Typography>
          }
          style={{ backgroundColor: stats.column.color }}
        />
        <CardContent>
          {/* {column.groups.map(g => (
            <GroupSummary key={g.id} group={g} />
          ))} */}
          {stats.items.length ? (
            <PostsList items={stats.items} />
          ) : (
            <Typography variant="body1">No posts in this category.</Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

interface GroupSummaryProps {
  group: ColumnStatsItem;
}

const GroupSummary = ({ group }: GroupSummaryProps) => {
  return (
    <GroupContainer>
      <GroupTitle>
        <Score>
          <PositiveNumber>+{group.likes}</PositiveNumber>&nbsp;
          <NegativeNumber>-{group.dislikes}</NegativeNumber>
        </Score>
        {group.content}
      </GroupTitle>
      <PostsList items={group.children} />
    </GroupContainer>
  );
};

const GroupContainer = styled.div`
  > :nth-child(2) {
    margin-left: 5px;
  }
`;
const GroupTitle = styled.div`
  display: flex;
  font-weight: bold;
`;

interface PostsListProps {
  items: ColumnStatsItem[];
}

const PostsList = ({ items }: PostsListProps) => {
  // const sortedList = useMemo(() => {
  //   return [...posts].sort(sortPostByVote);
  // }, [posts]);
  return (
    <>
      {items.map(item =>
        item.type === 'post' ? (
          <PostLine item={item} key={item.id} />
        ) : (
          <GroupSummary group={item} key={item.id} />
        )
      )}
    </>
  );
};

interface PostLineProps {
  item: ColumnStatsItem;
}

const PostLine = ({ item }: PostLineProps) => {
  return (
    <Typography component="div">
      <PostContainer role="listitem">
        <Score>
          <PositiveNumber>+{item.likes}</PositiveNumber>&nbsp;
          <NegativeNumber>-{item.dislikes}</NegativeNumber>
        </Score>
        <PostContent aria-label="post content">{item.content}</PostContent>
      </PostContainer>
    </Typography>
  );
};

const PostContainer = styled.div`
  display: flex;
`;

const Score = styled.div`
  margin-right: 10px;
`;

const PositiveNumber = styled.span`
  color: ${Palette.positive};
`;

const NegativeNumber = styled.span`
  color: ${Palette.negative};
`;

const PostContent = styled.span`
  white-space: pre-wrap;
  flex: 1;
`;

// const ActionsList = ({ items: posts }: PostsListProps) => {
//   const theme = useTheme();
//   const {
//     Actions: { summaryTitle },
//   } = useTranslations();
//   return (
//     <Grid
//       container
//       spacing={4}
//       component="section"
//       role="list"
//       style={{ marginTop: 30 }}
//     >
//       <Grid item xs={12}>
//         <Card>
//           <CardHeader
//             title={
//               <Typography variant="h6" style={{ fontWeight: 300 }}>
//                 {summaryTitle}
//               </Typography>
//             }
//             style={{
//               backgroundColor: theme.palette.primary.main,
//               color: theme.palette.primary.contrastText,
//             }}
//           />
//           <CardContent>
//             <List>
//               {posts.map(post => (
//                 <ListItem key={post.id}>
//                   <ListItemIcon>
//                     <Avatar>
//                       <Feedback />
//                     </Avatar>
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={post.action}
//                     secondary={post.content}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

const SummaryMode: React.SFC<SummaryModeProps> = ({ columns }) => {
  // const posts = useMemo(() => {
  //   return columns.reduce<Post[]>((prev, current) => {
  //     return [...prev, ...current.posts.filter(post => !!post.action)];
  //   }, []);
  // }, [columns]);
  const stats = useMemo(() => {
    return calculateSummary(columns);
  }, [columns]);
  return (
    <Page>
      <div>
        {stats.map(stat => (
          <Section key={stat.column.index} stats={stat} />
        ))}
        {/* {posts.length ? <ActionsList posts={posts} /> : null} */}
      </div>
      <SpeedDialContainer>
        <SpeedDial />
      </SpeedDialContainer>
    </Page>
  );
};

const SpeedDialContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export default SummaryMode;
