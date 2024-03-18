import { Product } from '@/types';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    product: Product;
}


const ProductLook = ({ product }: Props) => {
    return (
        <Link href={`/products/${product._id}`} className="product-card">
            <div className='product-card_img-container'>
                <Image
                    src={product.image}  //  className='product-title'
                    alt={product.title}
                    width={500}
                    height={500}
                    className=' rounded-3xl   border-double border-4 border-slate-500/50 shadow-md'
                />
            </div>

            <div className='flex flex-col gap-3'>
                <h3 className='product-title' >{product.title}</h3>  
                <div className='flex justify-between'>
                    <p className='text-black opacity-50 text-lg capitalize'>
                        {`${product.stars}/5`}
                    </p>
                    <p className=' text-sky-700 text-lg font-semibold'>
                        <span >{product?.currency}</span>
                        <span >{product?.currentPrice}</span>
                    </p>
                </div>
            </div>
        </Link>
    )

}


export default ProductLook