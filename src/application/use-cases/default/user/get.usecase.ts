import { BadRequestException } from "@nestjs/common";
import { IUserRepo } from "src/domain/repositories/account/user/user.interface";
import { ERR } from "src/infrastructure/common/filter/err-codes.const";
import GetUserDto from "src/presentation/default/user/dto/get.dto";

export class GetUserByIdUseCases {
  constructor(private repo: IUserRepo) {}

  async execute(obj: { payload: GetUserDto }) {
    const user = await this.repo.getById(obj.payload.id);
    if (!user) throw new BadRequestException(ERR.USER.NOT_FOUND);
    return { entity: user };
  }

//  also you can model entity which come from DB
//  private toModel(user: UserM): UserViewM {
//    return logic;
//  }
}
