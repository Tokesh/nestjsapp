import { BadRequestException } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { UserM } from 'src/domain/model/user/user';
import { IUserRepo } from 'src/domain/repositories/account/user/user.interface';
import { ERR } from 'src/infrastructure/common/filter/err-codes.const';
import RegisterDto from 'src/presentation/control/user/dto/register.dto';

export class FormUserUseCases {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly bcryptService: IBcryptService,
  ) {}
  async execute(obj: { payload: RegisterDto }) {
    const isEmailExists = await this.userRepo.getByEmail(obj.payload.email);
    if (isEmailExists) throw new BadRequestException(ERR.USER.EMAIL_EXISTS);

    const isPhoneExists = await this.userRepo.getByPhone(obj.payload.phone);
    if (isPhoneExists) throw new BadRequestException(ERR.USER.PHONE_EXISTS);

    const model = await this.toCreateUserModel(obj.payload);
    await this.userRepo.save(model);

  }

  private async toCreateUserModel(
    payload: RegisterDto
  ): Promise<UserM | null> {
    const user: UserM = new UserM();

    user.name = payload.name;
    user.password = await this.bcryptService.hash(payload.password),
    user.phone = payload.phone;
    user.email = payload.email;
    return user;
  }
}
