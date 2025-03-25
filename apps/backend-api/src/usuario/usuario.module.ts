// apps/backend-api/src/usuario/usuario.module.ts
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Usuario, UsuarioSchema} from './schema/usuario.schema';
import {UsuarioRepository} from './repositories/usuario.repository';
import {UsuarioService} from './usuario.service';
import {UsuarioController} from './usuario.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Usuario.name, schema: UsuarioSchema}
        ])
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository],
    exports: [UsuarioService]
})
export class UsuarioModule {
}