import Image from 'next/image';

interface Props {
    title: string;
    iconSrc: string;
    value: string;
    borderColor:string;
}

function PriceLook({title, iconSrc, value, borderColor}: Props) {
  return (
    <div className={`price-info_card border-l-[${borderColor}]`}>
        <p className="text-base text-black-100">{title}</p>

        <div className="flex gap-1">
            <Image
                src={iconSrc}
                alt={title}
                width={30}
                height={30}
            />
            <p className="text-base text-black-100">{value}</p>
        </div>
    </div>
  )
}

export default PriceLook