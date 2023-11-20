const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'medshoje@gmail.com',
    pass: 'medshoje@123',
  },
});

async function enviarEmail(destinatario, assunto, corpo) {
  const info = await transporter.sendMail({
    from: 'medshoje@gmail.com',
    to: destinatario,
    subject: assunto,
    html: corpo,
  });

  console.log('E-mail enviado:', info.messageId);
}

module.exports = { enviarEmail };
