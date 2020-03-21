import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { PostGroup } from '../entities';
import ColumnRepository from './ColumnRepository';
import {
  PostGroup as JsonPostGroup,
  User as JsonUser,
} from 'retro-board-common/src/types';

@EntityRepository(PostGroup)
export default class PostGroupRepository extends Repository<PostGroup> {
  async saveFromJson(
    group: Omit<JsonPostGroup, 'createdBy'>,
    authorId: string
  ): Promise<JsonPostGroup> {
    const groupWithoutPosts = {
      ...group,
      createdBy: { id: authorId },
    };
    delete groupWithoutPosts.posts;

    const createdPostGroup = await this.save(groupWithoutPosts);

    return {
      ...createdPostGroup,
      posts: [],
    };
  }
}
