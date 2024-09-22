import { BadRequestException } from "@nestjs/common";
import { IUserRepo } from "src/domain/repositories/account/user/user.interface";
import { ERR } from "src/infrastructure/common/filter/err-codes.const";
import { UpdateUserDto } from "src/presentation/control/user/dto/update.dto";


export class UpdateUserUseCases {
  constructor(private readonly repo: IUserRepo) {}
  async execute(obj: { payload: UpdateUserDto }) {
    const user = await this.repo.getById(obj.payload.id);
    if(!user) throw new BadRequestException(ERR.USER.NOT_FOUND);

    await this.repo.save(Object.assign(user, obj.payload));
  }
}
