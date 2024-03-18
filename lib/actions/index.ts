"use server"
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { scrapeID } from "./scrape";
import { connectToDB } from "../mongoose";
import { extractFirstRating, getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { User } from "@/types";

export async function scraper(URL: string){
  if (!URL) return;
  try {
     connectToDB();

     const scrapedProduct = await scrapeID(URL);

     if(!scrapedProduct)return;

     let product = scrapedProduct;
     const existingProduct = await Product.findOne({url: scrapedProduct.url});

     if(existingProduct){
       const updatedPriceHistory: any = [...existingProduct.priceHistory,
       { price: scrapedProduct.currentPrice}
      ]

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowerPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        average: getAveragePrice(updatedPriceHistory),
        //reviews: extractFirstRating(updatedPriceHistory),
      }
     }

     const newProduct = await Product.findOneAndUpdate(
       {url: scrapedProduct.url},
       product,
       {upsert: true, new: true}
     );
    revalidatePath(`/products/${newProduct._id}`);
  }catch (error:any) {
    throw new Error(`Cant see upadte:${error.message}`)
  }
}

export async function getProductById(productID: string) {
  try{
    connectToDB();

    const product = await Product.findOne({_id: productID});
    
    if(!product)return null;

    return product;
  }catch(error){
    console.log(error);
  }
}

export async function getAllProduct() {
  try{
    connectToDB();

    const products = await Product.find();

    return products;
  }catch(error){
    console.log(error);
  }
}

export async function EmailtoProduct(productId:string, email:string) {
  try {
    const product = await Product.findById(productId);
    
    if(!product)return;

    const userExists = product.users.some((user:User) => user.email === email);
    
    if(!userExists){
      product.users.push({email: email});
      await product.save();
      const emailContent = await generateEmailBody(product,"WELCOME");
      await sendEmail(emailContent,[email])
    }

  } catch (error) {
    console.log(error);
  }
}