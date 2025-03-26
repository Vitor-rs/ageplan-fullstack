import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsappService } from './whatsapp.service';
import { WhatsappRepository } from './whatsapp.repository';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [WhatsappService, WhatsappRepository],
  exports: [WhatsappService, WhatsappRepository],
})
export class WhatsappModule {}
