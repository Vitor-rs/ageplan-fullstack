// usuario/usuario.controller.ts
import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsuarioService} from './usuario.service';
import {CreateUsuarioDto} from './dto/create-usuario.dto';
import {UpdateUsuarioDto} from './dto/update-usuario.dto';
import {RegisterDto} from './dto/register.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.usuarioService.register(registerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usuarioService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usuarioService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.usuarioService.update(id, updateUsuarioDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usuarioService.remove(id);
    }
}