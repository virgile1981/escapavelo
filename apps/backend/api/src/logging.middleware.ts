import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const { method, originalUrl, params, query } = req;

        console.log(`[${method}] ${originalUrl}`);
        console.log(`Params:`, params);
        console.log(`Query:`, query);

        next();
    }
}