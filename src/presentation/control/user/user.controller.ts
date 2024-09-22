import { Body, Controller, Delete, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import RegisterDto from '../../control/user/dto/register.dto';
import { UserProxy } from 'src/infrastructure/usecase-proxy/user/user.proxy';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';
import { FormUserUseCases } from 'src/application/use-cases/control/form.usecase';
import { DeleteUserUseCases } from 'src/application/use-cases/control/delete.usecase';
import { UpdateUserUseCases } from 'src/application/use-cases/control/update.usecase';
import { SUCCESS } from 'src/infrastructure/common/interceptors/success-codes.const';
import { UpdateUserDto } from 'src/presentation/control/user/dto/update.dto';
import { DeleteUserDto } from 'src/presentation/control/user/dto/delete.dto';

@Controller('control/user')
export class UserControlController {
  constructor(
    @Inject(UserProxy.FORM_USER_USE_CASE)
    private readonly formUseCaseProxy: UseCaseProxy<FormUserUseCases>,
    @Inject(UserProxy.DELETE_USER_USE_CASE)
    private readonly deleteUseCaseProxy: UseCaseProxy<DeleteUserUseCases>,
    @Inject(UserProxy.UPDATE_USER_USE_CASE)
    private readonly updateUseCaseProxy: UseCaseProxy<UpdateUserUseCases>,
  ) {}

  // here we can use jwtguards
  @Post('form')
  async form(@Body() payload: RegisterDto) {
    await this.formUseCaseProxy.getInstance().execute({ payload });
    return {
      statusCode: 200,
      message: SUCCESS.USER.FORM,
    };
  }

  @Delete('')
  async delete(@Query() payload: DeleteUserDto) {
    await this.deleteUseCaseProxy.getInstance().execute({ payload });
    return {
      statusCode: 200,
      message: SUCCESS.USER.DELETE,
    };
  }

  @Post('update')
  async update(@Body() payload: UpdateUserDto) {
    await this.updateUseCaseProxy.getInstance().execute({ payload });
    return {
      statusCode: 200,
      message: SUCCESS.USER.UPDATE,
    };
  }
}
