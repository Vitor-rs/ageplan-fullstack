import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WhatsappRepository } from './whatsapp.repository';
import { Message } from './schemas/message.schema';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly wppConnectUrl: string;
  private readonly sessionName: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly whatsappRepository: WhatsappRepository,
  ) {
    this.wppConnectUrl = this.configService.get<string>('WPPCONNECT_URL');
    this.sessionName = this.configService.get<string>('WPPCONNECT_SESSION', 'AGEPLAN_SESSION');
  }

  async getContacts(): Promise<any> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.wppConnectUrl}/api/${this.sessionName}/contacts`),
      );
      return data;
    } catch (error) {
      this.logger.error(`Erro ao obter contatos via WPPConnect: ${error.message}`);
      throw error;
    }
  }
}
