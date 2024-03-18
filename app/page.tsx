import Searchbar from '@/components/Searchbar'
import React from 'react'
import { getAllProduct } from '@/lib/actions'
import ProductLook from '@/components/ProductLook';

const Home = async () => {
  const allProducts = await getAllProduct();


  return (
    <>
    <section className='px-6 border-2 md:px-20 py-24 border-slate-900 bg-slate-500'>
     <div className='flex max-xl:flex-col gap-16'>
       <div className='flex flex-col justify-center'>
        <h1 className=' head-text text-slate-900'>Scraper is a web scraping tool that allows you to scrape data from <span className='text-amber-600'>Amazon</span></h1>
        <Searchbar/>      
       </div>
     </div>
    </section>

    <section className='trending-section px-6 border-2 md:px-20 py-24 border-slate-900 bg-slate-500'>
     <h2 className='section-text  text-slate-900'>History</h2>  
     
     <div className='flex  flex-wrap gap-16'>
      {allProducts?.map((product) => (
        <ProductLook key={product._id} product = {product} />
      ))}
     </div>
    </section>
   </>
    
  )
}

export default Home