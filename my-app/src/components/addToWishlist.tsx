"use client"
import { ProductWishlist } from "@/app/interfaces/productInterfaces";
import { MouseEvent } from "react";

interface AddWishlistProps {
    product: ProductWishlist;
}

export default function AddWishlistButton({ product }: AddWishlistProps) {
    
    async function handleAddWishlist(e: MouseEvent<HTMLButtonElement>, id: string) {
        e.preventDefault();
        try {
            
            await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId: id })
            });
            console.log("added");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={(e) => handleAddWishlist(e, product._id as string)}>Add Wishlist</button>
        </div>
    );
}
