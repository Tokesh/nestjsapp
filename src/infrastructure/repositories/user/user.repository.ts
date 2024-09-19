import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { UserM } from 'src/domain/model/user/user';
import { UserEntity } from 'src/infrastructure/entities/user/user.entity';
import { IUserRepo } from 'src/domain/repositories/account/user/user.interface';

@Injectable()
export class UserRepoOrm implements IUserRepo {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async save(user: UserM): Promise<UserM> {
    const entity = await this.repo.save(user);

    return this.toModel(entity);
  }
  async getById(id: number): Promise<UserM | null> {
    const entity = await this.repo.findOne({
      where: {
        id,
      },
      relations: ['permissions', 'partner'],
    });
    return entity ? this.toModel(entity) : null;
  }


  async getByEmail(email: string): Promise<UserM | null> {
    const entity = await this.repo.findOne({
      where: {
        email,
      },
      relations: ['permissions', 'partner'],
    });

    return entity ? this.toModel(entity) : null;
  }

  async getByPhone(phone: string): Promise<UserM | null> {
    const entity = await this.repo.findOne({
      where: {
        phone,
      },
      relations: ['permissions', 'partner'],
    });
    return entity ? this.toModel(entity) : null;
  }

  private toModel(entity: UserEntity): UserM {
    const model: UserM = new UserM();
    model.id = entity.id;
    model.name = entity.name;
    model.email = entity.email;
    model.phone = entity.phone;
    model.password = entity.password;
    model.created = entity.created;
    return model;
  }
}
