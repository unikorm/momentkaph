import { SendEmailServerType } from '../dtos';
import { EmailFormStyles } from './email-form.styles';

export class EmailFormTemplate {

    private static escapeHtml = (unsafe: string): string => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    static generateEmailFormTemplate = (data: SendEmailServerType): string => {
        const { name, email, phone, message, timestamp } = data;

        return `
         <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${EmailFormStyles}
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h2 style="margin: 0; color: #343a40;">New request from momentkaph.sk</h2>
                <p style="margin: 0; color: #6c757d;">Received at: ${timestamp}</p
            </div>
            
            <div class="contact-details">
              <p><span class="label">Name:</span> ${this.escapeHtml(name)}</p>
              <p><span class="label">Email:</span> ${this.escapeHtml(email)}</p>
              <p><span class="label">Phone:</span> ${this.escapeHtml(phone)}</p>
            </div>
            
            <div class="message-content">
              <p class="label">Message:</p>
              <p style="white-space: pre-wrap;">${this.escapeHtml(message)}</p>
            </div>
          </div>
        </body>
      </html>
        `
    }
}