import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({where: {id: user_id}, relations: ["games"]});

    return user as User;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
   const users = await this.repository.query(`select * from users order by users.first_name asc`); // Complete usando raw query 
    
   return users as unknown as User[];
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this.repository.query(`select * from users where LOWER(users.first_name) like LOWER('%${first_name}%') or LOWER(users.last_name) like LOWER('%${last_name}%') `);

    return users as unknown as User[];
  }
}
