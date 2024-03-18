"use server"

import { extractCurrency, extractDescription, extractFirstRating, price } from '@/lib/utils';
import axios from 'axios';
import * as cheerio from 'cheerio';



export async function scrapeID(url: string) {
    if (!url) return;

    //brightdata
    const username = String(process.env.BRIGHTDATA_USER)
    const password = String(process.env.BRIGHTDATA_PASSWORD)
    const port = 22225;
    const session_id = (10000000000000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try{
      const response = await axios.get(url, options);
      const $ = cheerio.load(response.data);

      const id = $('#productTitle').text().trim();
      const currentPrice =  price(
        $('.priceToPay span.a-price-whole'),
        $('.a.size.base.a-color-price'),
        $('.a-button-selected .a-color-base'),
        $('.a-price aok-align-center reinventPricePriceToPayMargin priceToPay'),
      );

      const originalPrice = price(
        $('#priceblock_ourprice'),
        $('.a-price.a-text-price span.a-offscreen'),
        $('#listPrice'),
        $('.a-price a-text-price')
      )

      const outofStock = $('#availability span .a-size-medium a-color-success').text().trim().toLowerCase() === 'currently unavailable';

      const image = 
         $('#imgBlkFront').attr('data-a-dynamic-image') ||
         $('#landingImage').attr('data-a-dynamic-image') ||
          '{}'
       const imageURL = Object.keys(JSON.parse(image));
       
       const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"");
       

      console.log({id, currentPrice, originalPrice, outofStock, imageURL, discountRate});


      const currency = extractCurrency($('.a-price-symbol'))

      const description = extractDescription($)

      const Head = extractFirstRating (
        $('.a-icon-alt').text()
      );

     


     const data = {
        url,
        currency: currency || 'unavalible',
        image: imageURL[0],
        title: id,
        currentPrice: Number(currentPrice) || Number(originalPrice),
        originalPrice: Number(originalPrice) || Number(currentPrice),
        priceHistory: [],
        discountRate: Number(discountRate),
        category: 'category',
        reviewsCount:100,
        stars: Head,
        isOutOfStock: outofStock,
        description,
        lowestPrice: Number(currentPrice) || Number(originalPrice),
        highestPrice: Number(originalPrice) || Number(currentPrice),
        averagePrice: Number(currentPrice) || Number(originalPrice),
      }
      return data;
    }catch (error: any) {
        throw new Error(`Failed to Scrape: ${error.message}`)
    }
}