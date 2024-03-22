"use client"
import { ProductWishlist } from "@/app/interfaces/productInterfaces";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

interface ProductCardProps{
    product: ProductWishlist
}

export default function ProductsCard({ product }: ProductCardProps) {
    
    async function handleAddWishlist(e: MouseEvent<HTMLButtonElement>, id:string){
        e.preventDefault()
        
        try {
            await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlists`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId: id })
            })
            console.log("added");
        } catch (error) {
            console.error(error);
        }
    }

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
                    <button className="btn btn-primary" onClick={(e) => handleAddWishlist(e, product._id)}>Add to Wishlist</button>
                </div>
            </div>
        </div>
    );

}
