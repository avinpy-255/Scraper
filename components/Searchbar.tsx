"use client"
import { scraper } from '@/lib/actions'
import {FormEvent, useState} from 'react'

const isValidAmazonProductURL = (url: string) =>{
  try{
    const URl = new URL(url)
    const hostname = URl.hostname

    if(hostname.includes('amazon.com') ||
       hostname.includes('amazon.in') || 
       hostname.endsWith('amazon')
    ){
      return true
    }
  }catch(e){
    return false
  }

  return false
}

const Searchbar = () => {
  const [searchPrompt, setsearchPrompt] = useState('');
  const [searchResults, setsearchResults] = useState(false); 
    const submit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      const validLink = isValidAmazonProductURL(searchPrompt);
      
      if(!validLink){ return alert('invalid link'); }

      try{
        setsearchResults(true);
        const product = await scraper(searchPrompt);
         

      }catch (error) {
       console.log(error);
      }finally {
        setsearchResults(false);
      }
    }
  return (
    <form className="flex flex-wrap gap-4 mt-15" onSubmit={submit}>
     <input 
     type="text"
     value={searchPrompt}
     onChange={(e) => setsearchPrompt(e.target.value)} 
     placeholder="enter product link" 
     className="searchbar-input"
     />
     <button type="submit" className="searchbar-btn">{searchResults ? 'Searching....': 'Search'}</button>
    </form>
  )
}

export default Searchbar