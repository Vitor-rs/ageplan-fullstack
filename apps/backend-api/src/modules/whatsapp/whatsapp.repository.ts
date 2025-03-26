import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class WhatsappRepository {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(message: Message): Promise<Message> {
    const createdMessage = new this.messageModel(message);
    return createdMessage.save();
  }

  async getMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
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
