import { ProductWishlist } from "@/app/interfaces/productInterfaces";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps{
    product: ProductWishlist
}

export default function ProductsCardHome({ product }: ProductCardProps) {

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <Image src={product.thumbnail} alt={product.name} className="rounded-xl" width={500} height={300} />
            </figure>
            <div className="card-body items-center text-center">
                <div className="mb-2 card-title">
                    {product.name}
                </div>

                <div className="card-actions">
                <Link href={process.env.NEXT_PUBLIC_BASE_URL + `/products/${product.slug}`} >
                    <button className="btn btn-primary">See Detail</button>
                </Link>
                </div>
            </div>
        </div>
    );

}
