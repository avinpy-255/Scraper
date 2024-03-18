"use server"

import { EmailContent, EmailProductInfo, NotificationType } from '@/types';
import nodemailer from 'nodemailer';

const Notification = {
    WELCOME: 'WELCOME',
    CHANE_OF_STOCK: 'CHANE_OF_STOCK',
    LOWEST_PRICE: 'LOWEST_PRICE',
    THRESHOLD_MET: 'THRESHOLD_MET',
}

export async function generateEmailBody (product: EmailProductInfo, type: NotificationType) {
    const THRESHOLD_PERCENTAGE = 40;
    // Shorten the product title
    const shortenedTitle =
        product.title.length > 20
            ? `${product.title.substring(0, 20)}...`
            : product.title;

    let subject = "";
    let body = "";

    switch (type) {
        case Notification.WELCOME:
            subject = `Welcome to Price Tracking for ${shortenedTitle}`;
            body = `
        <div>
          <h4>Thanks For Subscribing SCRAPER ⛏ </h4>
          <p>You are now tracking ${product.title}.</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} is back in stock!</h3>
            <p>We're excited to let you know that ${product.title} is now back in stock.</p>
            <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer"></a>!</p>
          </div>
          <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
        </div>
      `;
            break;

        case Notification.CHANE_OF_STOCK:
            subject = `${shortenedTitle} is now back in stock!`;
            body = `
        <div>
          <h4>${product.title} is now restocked!!</h4>
          <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
            break;

        case Notification.LOWEST_PRICE:
            subject = `Lowest Price Alert for ${shortenedTitle}`;
            body = `
        <div>
          <h4>${product.title} has reached its lowest price ever!!</h4>
          <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
        </div>
      `;
            break;

        case Notification.THRESHOLD_MET:
            subject = `Discount Alert for ${shortenedTitle}`;
            body = `
        <div>
          <h4>${product.title} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
            break;

        default:
            throw new Error("Invalid notification type.");
    }

    return { subject, body };
}


const transporter = nodemailer.createTransport({
    pool: true,
    service: 'hotmail',
    port: 2525,
    auth: {
        user: 'scrape-25@outlook.com',
        pass: process.env.EMAIL_PASS
    },
    maxConnections: 1
})



export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
    const mailOptions = {
        from: 'scrape-25@outlook.com',
        to: sendTo,
        subject: emailContent.subject,
        html: emailContent.body
    }
    transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Email sent:' + info.response)
    }
})

    
}