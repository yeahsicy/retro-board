import { useMemo } from 'react';
import useTranslations from '../../translations';
import useGlobalState from '../../state';
import { ColumnContent } from '../game/types';
import { extrapolate } from '../../state/columns';

export default function useColumns() {
  const translations = useTranslations();
  const { state } = useGlobalState();
  const { session } = state;
  const posts = session ? session.posts : [];
  const groups = session ? session.groups : [];
  const cols = session ? session.columns : [];

  const columns: ColumnContent[] = useMemo(
    () =>
      cols
        .map(col => extrapolate(col, translations))
        .map(
          (col, index) =>
            ({
              index,
              posts: posts.filter(p => p.column === index && p.group === null),
              groups: groups
                .filter(p => p.column === index)
                .map(group => ({
                  ...group,
                  posts: posts.filter(
                    p => !!p.group && p.group.id === group.id
                  ),
                })),
              ...col,
            } as ColumnContent)
        ),
    [posts, groups, cols, translations]
  );
  return columns;
}
