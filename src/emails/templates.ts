export const ownerNotificationEmailTemplate = (lead: any) => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #fff; color: #111;">
      <div style="background: #F27D26; padding: 30px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">🔥 New Lead Received</h1>
      </div>
      <div style="padding: 40px;">
        <p style="font-size: 16px; line-height: 1.6;">You've received a new booking from your website.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.company}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Challenge</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.challenge}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Source</td>
            <td style="padding: 10px; border-bottom: 10px solid #eee;">${lead.referralSource}</td>
          </tr>
        </table>
        <div style="text-align: center; margin-top: 40px;">
          <a href="${process.env.APP_URL}" style="background: #111; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Website</a>
        </div>
      </div>
      <div style="padding: 20px; text-align: center; color: #999; font-size: 12px;">
        Sent automatically from your ConvertMax landing page.
      </div>
    </div>
  `;
};

export const confirmationEmailTemplate = (lead: any) => {
  const firstName = lead.name.split(' ')[0];
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #fff; color: #111;">
      <div style="padding: 40px;">
        <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">You're all set, ${firstName}!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">
          Thanks for booking your free strategy call with ConvertMax. We've received your details and we're excited to learn more about <strong>${lead.company}</strong>.
        </p>
        
        <div style="background: #f9f9f9; padding: 25px; border-radius: 10px; margin: 30px 0;">
          <h2 style="font-size: 18px; margin-top: 0;">What happens next?</h2>
          <ul style="padding-left: 20px; color: #555; line-height: 1.8;">
            <li>You'll hear from us within 24 business hours to confirm your exact call time.</li>
            <li>We'll review your challenge: <em>"${lead.challenge}"</em> beforehand.</li>
            <li>No preparation is needed on your part—just show up ready to talk growth.</li>
          </ul>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #444;">
          Talk soon,<br>
          <strong>The ConvertMax Team</strong>
        </p>
      </div>
      <div style="padding: 30px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
        &copy; ${new Date().getFullYear()} ConvertMax. All rights reserved.
      </div>
    </div>
  `;
};
