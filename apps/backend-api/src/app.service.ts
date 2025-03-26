import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';
import {firstValueFrom} from 'rxjs';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);
    private readonly wppConnectUrl: string;
    private readonly sessionName: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.wppConnectUrl = this.configService.get<string>('WPPCONNECT_URL');
        this.sessionName = this.configService.get<string>('WPPCONNECT_SESSION', 'AGEPLAN_SESSION');
    }

    getHello(): string {
        return 'AgePlan - Sistema de Gestão para Freelancers';
    }

    async getWppConnectStatus(): Promise<any> {
        try {
            const {data} = await firstValueFrom(
                this.httpService.get(`${this.wppConnectUrl}/api/${this.sessionName}/status`),
            );
            return data;
        } catch (error) {
            this.logger.error(`Erro ao obter status WPPConnect: ${error.message}`);
            throw error;
        }
    }

    async initializeWppConnect(): Promise<any> {
        try {
            const {data} = await firstValueFrom(
                this.httpService.post(`${this.wppConnectUrl}/api/${this.sessionName}/start-session`),
            );
            return data;
        } catch (error) {
            this.logger.error(`Erro ao inicializar WPPConnect: ${error.message}`);
            throw error;
        }
    }

    async closeWppConnect(): Promise<any> {
        try {
            const {data} = await firstValueFrom(
                this.httpService.post(`${this.wppConnectUrl}/api/${this.sessionName}/close-session`),
            );
            return data;
        } catch (error) {
            this.logger.error(`Erro ao fechar WPPConnect: ${error.message}`);
            throw error;
        }
    }

    async getContacts(): Promise<any> {
        try {
            const {data} = await firstValueFrom(
                this.httpService.get(`${this.wppConnectUrl}/api/${this.sessionName}/contacts`),
            );
            return data;
        } catch (error) {
            this.logger.error(`Erro ao obter contatos via WPPConnect: ${error.message}`);
            throw error;
        }
    }
}
