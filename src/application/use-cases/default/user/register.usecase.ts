import { BadRequestException } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { IUserRepo } from 'src/domain/repositories/account/user/user.interface';
import { ERR } from 'src/infrastructure/common/filter/err-codes.const';

export class RegisterUseCases {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly bcryptService: IBcryptService,
  ) {}
  async execute(obj: { payload: RegisterDto }) {
    const isEmailExists = await this.userRepo.getByEmail(obj.payload.email);
    if (isEmailExists) throw new BadRequestException(ERR.USER.EMAIL_EXISTS);

    const isPhoneExists = await this.userRepo.getByPhone(obj.payload.phone);
    if (isPhoneExists) throw new BadRequestException(ERR.USER.PHONE_EXISTS);

    const generatedPassword = `${Math.floor(Math.random() * (99999999 - 10000000) + 10000000)}`;

    const model = await this.toCreateUserModel(obj.payload, generatedPassword);
    await this.userRepo.create(model);

  }

  private async toCreateUserModel(
    payload: RegisterDto,
    password: string,
  ): Promise<CreatePartnerM> {
    const model: CreatePartnerM = new CreatePartnerM();
    model.users = [
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        password: await this.bcryptService.hash(password),
      },
    ];

    return model;
  }
}
