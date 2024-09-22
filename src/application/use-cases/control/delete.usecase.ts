import { BadRequestException } from "@nestjs/common";
import { IUserRepo } from "src/domain/repositories/account/user/user.interface";
import { ERR } from "src/infrastructure/common/filter/err-codes.const";
import { DeleteUserDto } from "src/presentation/control/user/dto/delete.dto";


export class DeleteUserUseCases {
  constructor(private readonly repo: IUserRepo) {}
  async execute(obj: { payload: DeleteUserDto }) {
    const user = await this.repo.getById(obj.payload.id);
    if (!user) throw new BadRequestException(ERR.USER.NOT_FOUND);

    return this.repo.delete(obj.payload.id);
  }
}
