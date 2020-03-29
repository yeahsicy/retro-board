import { Post, PostGroup } from 'retro-board-common';
import { sortBy } from 'lodash';
import { ColumnContent } from '../types';
import { ColumnStats, ColumnStatsItem } from './types';
import { countVotes, countVotesForGroup } from '../utils';

export function calculateSummary(columns: ColumnContent[]): ColumnStats[] {
  return columns.map(calculateColumn);
}

function calculateColumn(column: ColumnContent): ColumnStats {
  const posts: ColumnStatsItem[] = column.posts.map(postToItem);
  const groups: ColumnStatsItem[] = column.groups.map(groupToItem);
  return { items: sortBy([...posts, ...groups], sortingFunction), column };
}

function postToItem(post: Post): ColumnStatsItem {
  return {
    id: post.id,
    content: post.content,
    type: 'post',
    children: [],
    likes: countVotes(post, 'like'),
    dislikes: countVotes(post, 'dislike'),
  };
}

function groupToItem(group: PostGroup): ColumnStatsItem {
  return {
    id: group.id,
    content: group.label,
    type: 'group',
    children: sortBy(group.posts.map(postToItem), sortingFunction),
    likes: countVotesForGroup(group, 'like'),
    dislikes: countVotesForGroup(group, 'dislike'),
  };
}

function sortingFunction(item: ColumnStatsItem) {
  return -(item.likes - item.dislikes);
}
