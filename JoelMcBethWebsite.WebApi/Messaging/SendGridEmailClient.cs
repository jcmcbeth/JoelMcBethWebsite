namespace JoelMcBethWebsite.WebApi.Messaging
{
    using JoelMcBethWebsite.Messaging;
    using SendGrid;
    using SendGrid.Helpers.Mail;
    using System;
    using System.Threading.Tasks;

    public class SendGridEmailClient : IEmailClient
    {
        private readonly SendGridClient sendGridClient;
        public SendGridEmailClient(SendGridClient sendGridClient)
        {
            this.sendGridClient = sendGridClient ?? throw new ArgumentNullException(nameof(sendGridClient));
        }

        public Task SendAsync(EmailMessage message)
        {
            if (message == null)
            {
                throw new ArgumentNullException(nameof(message));
            }

            var from = new EmailAddress("noreply@joelmcbeth.com");
            var to = new EmailAddress(message.To);

            var sendGridMessage = MailHelper.CreateSingleEmail(from, to, message.Subject, message.Content, message.Content);

            return this.sendGridClient.SendEmailAsync(sendGridMessage);
        }
    }
}
