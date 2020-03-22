import { ColumnContent } from './types';
import { Post, PostGroup } from 'retro-board-common';
import { flattenDeep } from 'lodash';

interface MovingEntities {
  post: Post;
  targetGroup: PostGroup | null;
  targetColumn: number;
  targetIndex: number;
}

interface CombiningEntities {
  post1: Post;
  post2: Post;
}

export function getCombiningEntities(
  postId1: string,
  postId2: string,
  columns: ColumnContent[]
): CombiningEntities | null {
  const post1 = findPost(columns, postId1);
  const post2 = findPost(columns, postId2);

  if (post1 && post2) {
    return { post1, post2 };
  }

  return null;
}

export function getMovingEntities(
  postId: string,
  targetId: string,
  targetIndex: number,
  columns: ColumnContent[]
): MovingEntities | null {
  const post = findPost(columns, postId);
  const type = targetId.split('#')[0];
  const id = targetId.split('#')[1];
  if (post && type === 'group') {
    const targetGroup = findGroup(columns, id);
    const targetColumn = findColumIndexForGroup(columns, id);
    if (targetGroup) {
      return {
        post,
        targetGroup,
        targetColumn,
        targetIndex,
      };
    }
  }
  if (post && type === 'column') {
    const targetColumn = +id;
    return {
      post,
      targetGroup: null,
      targetColumn,
      targetIndex,
    };
  }
  return null;
}

function findPost(columns: ColumnContent[], postId: string): Post | undefined {
  const allPosts = flattenDeep([
    ...columns.map(col => col.posts),
    ...columns.map(col => col.groups.map(group => group.posts)),
  ]);
  return allPosts.find(post => post.id === postId);
}

function findGroup(
  columns: ColumnContent[],
  groupId: string
): PostGroup | undefined {
  return flattenDeep(columns.map(col => col.groups)).find(
    group => group.id === groupId
  );
}

function findColumIndexForGroup(columns: ColumnContent[], groupId: string) {
  return columns.findIndex(col => col.groups.find(g => g.id === groupId));
}
