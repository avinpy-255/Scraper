import Image from 'next/image';

interface Props {
    title: string;
    iconSrc: string;
    value: string;
    borderColor:string;
}

function PriceLook({title, iconSrc, value, borderColor}: Props) {
  return (
    <div className={`price-info_card `}>
        <p className="font-mono text-base text-stone-200">{title}</p>

        <div className="flex gap-1">
            <Image
                src={iconSrc}
                alt={title}
                width={30}
                height={30}
            />
            <p className="font-mono text-base text-stone-200">{value}</p>
        </div>
    </div>
  )
}

export default PriceLook