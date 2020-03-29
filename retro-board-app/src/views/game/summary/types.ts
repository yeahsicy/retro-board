import { ColumnContent } from '../types';

export interface ColumnStats {
  items: ColumnStatsItem[];
  column: ColumnContent;
}

export interface ColumnStatsItem {
  id: string;
  type: 'post' | 'group';
  likes: number;
  dislikes: number;
  content: string;
  children: ColumnStatsItem[];
}
