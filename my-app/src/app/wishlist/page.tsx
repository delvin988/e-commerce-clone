"use client"
import { useEffect, useState } from 'react';
import WishlistCard from "@/components/wishlistCard";
import { Wishlist } from "../interfaces/productInterfaces";
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
export default function Product() {
    let router = useRouter()
    const [products, setProducts] = useState<Wishlist[]>([]);
    
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists", {
                    cache: 'no-store'
                });
                const responseData = await response.json();
                const productList: Wishlist[] = responseData.data;
                setProducts(productList);
                router.refresh()
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchWishlist();
    },[router]);

    const handleDelete = (id: string) => {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
    };

    return (
        <>
        <Navbar/>
        <main className="p-5">
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <WishlistCard product={product} key={product._id} onDelete={handleDelete} />
                    ))}
            </div>
        </main>
        </>
    );
}
