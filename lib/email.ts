import nodemailer from 'nodemailer';
import QRCode from 'qrcode';


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
        light: '#FFFFFF'
      }
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
              <li>Prezintă acest cod QR la intrarea în eveniment</li>
              <li>Codul poate fi scanat o singură dată</li>
              <li>Păstrează acest email până după eveniment</li>
              <li>Poți folosi și codul text de mai sus dacă QR nu funcționează</li>
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
// Generam Pdf
  function formatRoDate(d: Date) {
  const { PDFDocument, StandardFonts } = await import('pdf-lib');
  return new Date(d).toLocaleDateString('ro-RO', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// Word wrap simplu pentru pdf-lib (font standard)
function wrapText(text: string, maxCharsPerLine: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';

  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (test.length > maxCharsPerLine) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function generateParentalConsentPdf(data: {
  eventTitle: string;
  eventDate: Date;
  eventLocation: string;
  organizerName?: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // A4 (points)
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 50;

  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);

  const organizer = data.organizerName ?? 'ALTMAR GROUP S.R.L.';
  const eventDateStr = formatRoDate(data.eventDate);

  // Helper draw text
  let y1 = pageHeight - margin;
  const drawLine1 = (txt: string, bold = false, size = 11) => {
    const f = bold ? fontBold : font;
    page1.drawText(txt, { x: margin, y: y1, size, font: f });
    y1 -= size + 8;
  };

  let y2 = pageHeight - margin;
  const drawLine2 = (txt: string, bold = false, size = 11) => {
    const f = bold ? fontBold : font;
    page2.drawText(txt, { x: margin, y: y2, size, font: f });
    y2 -= size + 8;
  };

  // -------- PAGE 1 --------
  drawLine1('ACORD PARENTAL', true, 16);
  drawLine1('PARTICIPARE EVENIMENT', true, 13);
  y1 -= 6;

  drawLine1('Subsemnatul(a),', false, 11);
  drawLine1('Nume și prenume părinte / tutore legal: .................................................................');
  drawLine1('CNP: ...........................................................................................................');
  drawLine1('Domiciliu: ....................................................................................................');
  drawLine1('Telefon: ........................................................................................................');
  drawLine1('E-mail: .........................................................................................................');
  y1 -= 4;
  drawLine1('în calitate de părinte / tutore legal, declar pe propria răspundere că sunt reprezentantul legal al minorului:', false, 11);
  drawLine1('Nume și prenume copil: .........................................................................................');
  drawLine1('Data nașterii: .................................................................................................');
  drawLine1('Vârsta: ...........................................................................................................');
  y1 -= 8;

  drawLine1('DECLARAȚIE', true, 13);
  drawLine1('Prin prezenta:', false, 11);

  // Punctul 1 are variabile
  const p1 = `1. Îmi exprim acordul ca minorul menționat mai sus să participe la evenimentul ${data.eventTitle}, organizat de ${organizer}, în data de ${eventDateStr}, la locația ${data.eventLocation}.`;
  const p1Lines = wrapText(p1, 95);
  for (const ln of p1Lines) drawLine1(ln, false, 11);

  // Restul pe pagina 2, ca să nu înghesuim
  // -------- PAGE 2 --------
  const rest = [
    '2. Declar că am luat cunoștință de natura recreativă a evenimentului și de regulile de participare stabilite de organizator.',
    '3. Îmi asum răspunderea pentru minorul meu, confirmând că acesta este apt din punct de vedere medical și fizic pentru participarea la eveniment.',
    '4. Sunt de acord ca organizatorul să stabilească reguli de ordine și disciplină și să poată exclude minorul din eveniment în cazul nerespectării acestora, fără obligația returnării contravalorii biletului.',
    '5. Declar că organizatorul nu oferă supraveghere individuală și că participarea are loc într-un cadru organizat, dar recreativ.',
    '6. Declar că am fost informat(ă) că evenimentul nu implică vânzarea sau consumul de alcool de către minori.',
    '',
    'FOTO – VIDEO (opțional, dar recomandat)',
    '☐ Sunt de acord     ☐ Nu sunt de acord',
    'ca minorul să fie fotografiat / filmat în cadrul evenimentului, materialele putând fi utilizate în scop de promovare online (social media), fără caracter comercial individual.',
    '',
    'DATA ȘI SEMNĂTURA',
    'Data: .............................................',
    'Semnătura părinte / tutore legal: .....................................................',
    'Nume complet (lizibil): .................................................................',
    '',
    'Observație:',
    'Prezentul acord este valabil exclusiv pentru evenimentul menționat mai sus.',
  ];

  for (const paragraph of rest) {
    if (!paragraph) {
      y2 -= 10;
      continue;
    }
    const isTitle =
      paragraph === 'FOTO – VIDEO (opțional, dar recomandat)' ||
      paragraph === 'DATA ȘI SEMNĂTURA' ||
      paragraph === 'DECLARAȚIE';

    const lines = wrapText(paragraph, 95);
    for (const ln of lines) drawLine2(ln, isTitle, isTitle ? 12 : 11);
    if (isTitle) y2 -= 4;
  }

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}

  // Trimitem email cu QR code ca attachment (CID)
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
        contentType: 'image/png'
      }
    ]
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
