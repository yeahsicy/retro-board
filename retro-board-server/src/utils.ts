import { Request } from 'express';
import { User } from 'retro-board-common';

export function getUser(request: Request): User | null {
  return request.user || null;
}
