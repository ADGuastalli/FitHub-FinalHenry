// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendMailDto } from './SendMail.Dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendMail(@Body() body: SendMailDto) {
    const { to, subject, text } = body;
    return this.mailerService.notificarRegistro(to, subject, text);
  }
}
