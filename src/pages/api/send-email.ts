import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
      if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

    const msg = {
      to: 'guilopes.030206@gmail.com', // Replace with your recipient email
      from: 'percicirelli.33@gmail.com', // Replace with your verified SendGrid sender
      subject: `New message from ${name} (${email})`,
      text: message,
      html: `<strong>Name:</strong> ${name}<br/>
             <strong>Email:</strong> ${email}<br/>
             <strong>Message:</strong> ${message}`,
    };

    try {
      await sgMail.send(msg);
      return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
      return res.status(500).json({ message: 'Error sending email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
