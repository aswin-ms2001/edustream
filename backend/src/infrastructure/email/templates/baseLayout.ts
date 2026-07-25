export function renderBaseLayout(innerHtml: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 32px; border: 1px solid #e2e8f0; }
          .header { text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; }
          .button { display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; }
          .footer { font-size: 12px; color: #64748b; text-align: center; margin-top: 32px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #1e293b; margin: 0; font-size: 24px;">EduStream</h1>
          </div>
          <div style="padding: 24px 0;">
            ${innerHtml}
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} EduStream LMS. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
