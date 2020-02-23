import {
  Session,
  Post,
  SessionOptions,
  ColumnDefinition,
  Vote,
  User,
} from 'retro-board-common';

export interface Store {
  get: (user: User, key: string) => Promise<Session>;
  create: (
    id: string,
    options: SessionOptions,
    columns: ColumnDefinition[]
  ) => Promise<void>;
  saveSession: (user: User, session: Session) => Promise<void>;
  // saveUser: (user: User) => Promise<void>;
  getOrSaveUser: (user: User) => Promise<User>;
  savePost: (user: User, sessionId: string, post: Post) => Promise<void>;
  saveVote: (
    user: User,
    sessionId: string,
    postId: string,
    vote: Vote
  ) => Promise<void>;
  deletePost: (user: User, sessionId: string, postId: string) => Promise<void>;
}

export interface Configuration {
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  REDIS_ENABLED: boolean;
  REDIS_HOST: string;
  REDIS_PORT: number;
  BACKEND_PORT: number;
  SQL_LOG: boolean;
  SENTRY_URL: string;
}
