import { WorkerMailer } from 'worker-mailer';

interface Env {
  SMTP_HOST: string;
  SMTP_PORT?: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  CONTACT_TO: string;
}

const back = (request: Request, qs: string) =>
  Response.redirect(new URL(`/contact?${qs}`, request.url).toString(), 303);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return back(request, 'error=1');
  }

  // honeypot: bots fill this, humans never see it — pretend success
  if (form.get('company_website')) return back(request, 'sent=1');

  const name = String(form.get('name') ?? '').trim().slice(0, 200);
  const email = String(form.get('email') ?? '').trim().slice(0, 200);
  const phone = String(form.get('phone') ?? '').trim().slice(0, 50);
  const message = String(form.get('message') ?? '').trim().slice(0, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return back(request, 'error=1');
  }

  try {
    const mailer = await WorkerMailer.connect({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT ?? 465),
      secure: true,
      authType: 'plain',
      credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
    });

    await mailer.send({
      from: { name: 'MKM Website', email: env.SMTP_USER },
      to: env.CONTACT_TO,
      reply: email,
      subject: `Website enquiry — ${name}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone || '—'}`,
        '',
        message,
        '',
        '—',
        'Sent from the contact form at mkm.au',
      ].join('\n'),
    });
    return back(request, 'sent=1');
  } catch (err) {
    console.error('contact form send failed', err);
    return back(request, 'error=1');
  }
};
