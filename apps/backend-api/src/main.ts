import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {LoggerMiddleware} from './middlewares/logger.middleware';
import {HttpExceptionFilter} from './filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.use(LoggerMiddleware);
    app.useGlobalFilters(new HttpExceptionFilter());

    const port = configService.get<number>('PORT') || 3000;
    await app.listen(port);

    return app;
}

// Para ambiente de desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    bootstrap();
}

// Para Vercel (serverless)
export default bootstrap;
