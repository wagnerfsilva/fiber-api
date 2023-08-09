import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand, Body } from '@aws-sdk/client-ses';

const client = new SESClient({
  region: process.env.AWS_SES_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_SES_KEY || '',
    secretAccessKey: process.env.AWS_SES_SECRET || '',
  },
});

export interface AtributosEmail {
  source: string;
  toAddresses: string;
  subject: string;
  body: {
    text?: string;
    html?: string;
  };
}

@Injectable()
export class SESService {
  private static obtemToAddress(toAddress: string) {
    if (process.env.NODE_ENV !== 'production') {
      // retorna email de teste
      return process.env.AWS_SES_EMAIL_TESTE || '';
    }

    return toAddress;
  }

  async enviaEmail({ configEmail }: { configEmail: AtributosEmail }) {
    const body: Body = {};

    if (configEmail.body.text) body.Text = { Data: configEmail.body.text };
    if (configEmail.body.html) body.Html = { Data: configEmail.body.html };

    const command = new SendEmailCommand({
      Source: configEmail.source,
      Destination: {
        ToAddresses: [SESService.obtemToAddress(configEmail.toAddresses)],
      },
      Message: {
        Subject: {
          Data: configEmail.subject,
        },
        Body: body,
      },
    });

    return client.send(command);
  }
}
