import { getProductById } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import PriceLook from "@/components/PriceLook";
import Mod from "@/components/Mod";


type Props = {
  params: {id: string}
}

const ProductDetails = async ({params:{id}}: Props) => {
  const product = await getProductById(id);

  if (!product) redirect('/')

  return (
    <div className="product-container flex flex-col items-center  border-slate-900 bg-slate-500">
       <div>
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col relative pt-6">
          <div className="flex items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col justify-items-center gap-3">
              <p className="text-[28px]  text-secondary font-semibold">{product.title}</p>
              <Link
               href={product.url}
               target="_blank"
               className="text-base text-black opacity-50"
              >
                Go To
              </Link>
            </div>
             
            <div className=" pt-6   py-24 border-slate-900 bg-slate-500">
              <div className="flex flex-col gap-2 ">
                <p className="pr-4 text-[34px] text-secondary font-semibold">
                  {product.currency} {formatNumber(product.currentPrice)}
                </p>
              </div>
              <p className="text-[21px] text-black font-semibold opacity-50 line-through">
                  {product.currency} {formatNumber(product.originalPrice)}
                </p>
            </div>

            <div className="my-7 flex  gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                   src='/star.png'
                   alt="star"
                   width={50}
                   height={50}
                  />
                  <p className=" text-xl text-blue-400 ">
                    {product.stars}
                  </p>
                </div>

                <div>

                </div>
              </div>
            </div>
            <p>
              <span></span>
            </p>
          </div>
        </div>
        <div className="my-7 flex flex-col gap-5">
          <div className="flex gap-5 flex-wrap">
            <PriceLook
             title="Current Price"
             iconSrc="/price.png"
             value={`${product.currency} ${formatNumber(product.currentPrice)}`}
             borderColor="black"
            />
            <PriceLook
             title="Average Price"
             iconSrc="/price-tag.png"
             value={`${product.currency} ${formatNumber(product.currentPrice)}`}
             borderColor="black"
            />
            <PriceLook
             title="Highest Price"
             iconSrc="/up-arrow.png"
             value={`${product.currency} ${formatNumber(product.highestPrice)}`}
             borderColor="black"
            />
            <PriceLook
             title="Lowest Price"
             iconSrc="/download.png"
             value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
             borderColor="black"
            />
          </div>
        </div>
        <div>
          <Mod productId={id}/>
        </div>
       </div>
    </div>
  )
}

export default ProductDetails