import { readFileSync } from "fs";
import nodemailer from "nodemailer";


const sendMail = async (RECIPIENT_EMAIL) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USERNAME,
      pass: process.env.MAIL_TRAP_PASSWORD
    }
  });

  const mail = transport.sendMail({
    text: "Welcome to Mailtrap Sending!",
    to: {
      address: RECIPIENT_EMAIL,
      name: "John Doe"
    },
    from: {
      address: "harshprakash000@gmail.com",
      name: "Mailtrap Test"
    },
    subject: 'Welcome to Modern Threads!',
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Modern Threads</title>
          <!-- Your inline styles here -->
        </head>
        <body>
          <div class="container">
            <h1>Welcome to Modern Threads!</h1>
            <p>Thank you for registering with us. We're excited to have you on board.</p>
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fgifdb.com%2Fgif%2Fwelcome-to-the-team-minions-lh0qkfh4uwyqphcw.html&psig=AOvVaw19hrb2AGGTd-rBP3H9O-k7&ust=1701499787875000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMj2mOnS7YIDFQAAAAAdAAAAABAE" alt="Welcome Animation" class="animated-gif">
            <p>Explore our latest collection of modern threads and stay stylish!</p>
            <a href="#" class="cta-button">Shop Now</a>
            <p>If you have any questions, feel free to <a href="mailto:support@modernthreads.com">contact us</a>.</p>
          </div>
        </body>
        </html>
      `,
  })
    .then(
      console.log("Email sent successfully!")
    )
    .catch(console.error)
}

export default sendMail;