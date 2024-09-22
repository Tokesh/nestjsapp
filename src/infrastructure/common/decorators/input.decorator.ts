import { createParamDecorator } from '@nestjs/common';

export const UserBody = createParamDecorator((data, req) => {

  const body = req.switchToHttp().getRequest().body;

  return {
    ...body,
  };
});

export const UserQuery = createParamDecorator((data, req) => {

  const query = req.switchToHttp().getRequest().query;

  return {
    ...query,
  };
});
