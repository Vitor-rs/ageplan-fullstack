import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT || 3000);

    return app;
}

// Para ambiente de desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    bootstrap();
}

// Para Vercel (serverless)
export default bootstrap;