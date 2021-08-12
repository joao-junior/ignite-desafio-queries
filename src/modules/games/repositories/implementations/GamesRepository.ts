import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository.query(`select * from games where LOWER(games.title) like LOWER('%${param}%')`)
    // Complete usando query builder
    return games as unknown as Game[];
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`select count(*) from games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const games = await this.repository
    .createQueryBuilder("games")
    .innerJoinAndSelect("games.users", "users")
    .where("games.id = :id", { id })
    .getOneOrFail()

    return games.users;
      // Complete usando query builder
  }
}
