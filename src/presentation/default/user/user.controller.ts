import { Controller, Get, Inject, Query} from '@nestjs/common';
import { UserProxy } from 'src/infrastructure/usecase-proxy/user/user.proxy';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';
import { GetUserByIdUseCases } from 'src/application/use-cases/default/user/get.usecase';
import { UserQuery } from 'src/infrastructure/common/decorators/input.decorator';
import GetUserDto from 'src/presentation/default/user/dto/get.dto';


@Controller('user')
export class UserController {
  constructor(
    @Inject(UserProxy.GET_USER_USE_CASE)
    private readonly getUserUseCaseProxy: UseCaseProxy<GetUserByIdUseCases>,
  ) {}

  @Get('')
  async get(@UserQuery() payload: GetUserDto) {
    const user = await this.getUserUseCaseProxy.getInstance().execute({ payload });
    return {
      statusCode: 200,
      data: user,
    };
  }
}

