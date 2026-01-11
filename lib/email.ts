import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import fs from 'node:fs';
import path from 'node:path';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function generateQRCode(data: string): Promise<Buffer> {
  try {
    // Generăm QR code ca Buffer (imagine PNG) în loc de data URL
    return await QRCode.toBuffer(data, {
      type: 'png',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

export async function sendTicketEmail(
  to: string,
  ticketData: {
    name: string;
    eventTitle: string;
    eventDate: Date;
    eventLocation: string;
    quantity: number;
    code: string;
    totalAmount: string;
  }
) {
  // Generăm QR code ca Buffer
  const qrCodeBuffer = await generateQRCode(ticketData.code);

  // PDF STATIC: trebuie să existe în repo la public/acord-parental.pdf
  const parentalPdfPath = path.join(process.cwd(), 'public', 'acord-parental.pdf');
  const parentalPdfBuffer = fs.readFileSync(parentalPdfPath);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #06b6d4 0%, #eab308 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .ticket { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #06b6d4; }
        .qr-code { text-align: center; margin: 20px 0; background: white; padding: 20px; border-radius: 8px; }
        .qr-code img { max-width: 300px; height: auto; display: block; margin: 0 auto; }
        .info-row { margin: 10px 0; }
        .label { font-weight: bold; color: #06b6d4; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .warning-box { background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #eab308; }
        .code-display { background: #f3f4f6; padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 16px; letter-spacing: 2px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🎫 Biletul tău XPOSURE Events</h1>
        </div>
        <div class="content">
          <p>Bună ${ticketData.name},</p>
          <p>Îți mulțumim pentru achiziție! Mai jos găsești detaliile biletului tău:</p>
          
          <div class="ticket">
            <div class="info-row">
              <span class="label">Eveniment:</span> ${ticketData.eventTitle}
            </div>
            <div class="info-row">
              <span class="label">Data:</span> ${new Date(ticketData.eventDate).toLocaleDateString('ro-RO', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div class="info-row">
              <span class="label">Locație:</span> ${ticketData.eventLocation}
            </div>
            <div class="info-row">
              <span class="label">Cantitate:</span> ${ticketData.quantity} bilet(e)
            </div>
            <div class="info-row">
              <span class="label">Total plătit:</span> ${ticketData.totalAmount}
            </div>
            <div class="info-row">
              <span class="label">Cod bilet:</span> <span class="code-display">${ticketData.code}</span>
            </div>
          </div>
          
          <div class="qr-code">
            <p style="margin-top: 0;"><strong>Scanează acest cod QR la intrare:</strong></p>
            <img src="cid:qrcode" alt="QR Code pentru bilet ${ticketData.code}">
            <p style="font-size: 12px; color: #666; margin-bottom: 0;">Cod: ${ticketData.code}</p>
          </div>
          
          <div class="warning-box">
            <p style="margin: 0 0 10px 0;"><strong>⚠️ Important:</strong></p>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Minorii sunt rugați să se prezinte cu acordul parental completat</li>
              <li>Prezintă acest cod QR la intrarea în eveniment</li>
              <li>Codul poate fi scanat o singură dată</li>
              <li>Păstrează acest email până după eveniment</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>Ai întrebări? Contactează-ne la ${process.env.COMPANY_EMAIL || 'contact@xposure-events.ro'}</p>
            <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'XPOSURE Events'}. Toate drepturile rezervate.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@xposure-events.ro',
    to,
    subject: `Biletul tău pentru ${ticketData.eventTitle} 🎫`,
    html,
    attachments: [
      {
        filename: `ticket-qr-${ticketData.code}.png`,
        content: qrCodeBuffer,
        cid: 'qrcode', // Content-ID pentru referință în HTML (src="cid:qrcode")
        contentType: 'image/png',
      },
      {
        filename: 'Acord_Parental.pdf',
        content: parentalPdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const html = `
    <h2>Mesaj nou de contact - XPOSURE Events</h2>
    <p><strong>Nume:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ''}
    <p><strong>Subiect:</strong> ${data.subject}</p>
    <p><strong>Mesaj:</strong></p>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@xposure-events.ro',
    to: process.env.COMPANY_EMAIL || 'contact@xposure-events.ro',
    subject: `Contact Form: ${data.subject}`,
    html,
    replyTo: data.email,
  });
}
