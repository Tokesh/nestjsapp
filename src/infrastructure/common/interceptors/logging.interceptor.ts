import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    // if we want to get start time
    console.log(`[START] ${req.method} ${req.originalUrl} at ${new Date(startTime).toISOString()}`);

    res.on('finish', () => {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      console.log(`[END] ${req.method} ${req.originalUrl} at ${new Date(endTime).toISOString()} - proccessed in ${elapsedTime}ms`);
    });

    next();
  }
}
