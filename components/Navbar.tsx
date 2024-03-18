import Image from "next/image"
import Link from "next/link"

const navIcons = [
  {src: '/search (1).png', alt: 'Search'},
  {src: '/profile (1).png', alt: 'Profile'}

]


const Navbar = () => {
  return (
    <header className='w-full bg-slate-600'>
        <nav className='nav'>
          <Link href='/' className= 'flex items-center gap-1 '>
            <Image 
            src='/Scraper.ico' 
            alt='logo' 
            width={50}
            height={50} 
            
            />

            <p className="font-mono">
              <span className="text-gray-400 text-4xl">Scraper</span>
            </p>
          </Link>

         <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            <Image
              key = {icon.alt}
              src={icon.src}
              alt = {icon.alt}
              width={30}
              height={30}
              className="object-contain"
            />  
          ))}
         </div>

        </nav>
    </header>
  )

}  

export default Navbar