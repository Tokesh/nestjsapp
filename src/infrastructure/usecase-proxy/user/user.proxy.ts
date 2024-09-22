import { DeleteUserUseCases } from "src/application/use-cases/control/delete.usecase";
import { FormUserUseCases } from "src/application/use-cases/control/form.usecase";
import { UpdateUserUseCases } from "src/application/use-cases/control/update.usecase";
import { GetUserByIdUseCases } from "src/application/use-cases/default/user/get.usecase";
import { UserRepoOrm } from "src/infrastructure/repositories/user/user.repository";
import { BcryptService } from "src/infrastructure/services/bcrypt/bcrypt.service";
import { UseCaseProxy } from "src/infrastructure/usecase-proxy/usecase-proxy";

export enum UserProxy {
  /* CONTROL */
  DELETE_USER_USE_CASE = 'deleteUserUseCaseProxy',
  FORM_USER_USE_CASE = 'formUserUseCaseProxy',
  UPDATE_USER_USE_CASE = 'updateUserUseCaseProxy',

  /* DEFAULT */
  GET_USER_USE_CASE = 'getUseCaseProxy',
}

export const userProxyProviders = [
  /* CONTROL */
  {
    inject: [UserRepoOrm],
    provide: UserProxy.DELETE_USER_USE_CASE,
    useFactory: (repo: UserRepoOrm) =>
      new UseCaseProxy(new DeleteUserUseCases(repo)),
  },
  {
    inject: [UserRepoOrm, BcryptService],
    provide: UserProxy.FORM_USER_USE_CASE,
    useFactory: (repo: UserRepoOrm, bcrypt: BcryptService) =>
      new UseCaseProxy(new FormUserUseCases(repo, bcrypt)),
  },
  {
    inject: [UserRepoOrm],
    provide: UserProxy.UPDATE_USER_USE_CASE,
    useFactory: (repo: UserRepoOrm) =>
      new UseCaseProxy(new UpdateUserUseCases(repo)),
  },
  /* DEFAULT */
  {
    inject: [UserRepoOrm],
    provide: UserProxy.GET_USER_USE_CASE,
    useFactory: (repo: UserRepoOrm) =>
      new UseCaseProxy(new GetUserByIdUseCases(repo)),
  },
];

export const userProxyExports = [
  /* CONTROL */
  UserProxy.DELETE_USER_USE_CASE,
  UserProxy.FORM_USER_USE_CASE,
  UserProxy.UPDATE_USER_USE_CASE,

  /* CONTROL */
  UserProxy.GET_USER_USE_CASE,
];
