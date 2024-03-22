"use client"
import React, { useState, useEffect } from "react";
import ProductsCard from "@/components/productsCard";
import Navbar from "@/components/navbar";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductWishlist } from "../interfaces/productInterfaces";

export default function ProductItem(){
    const [products, setProducts] = useState<ProductWishlist[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const fetchProduct = async (pageNumber: number) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products?page=${pageNumber}`, {
                cache: "no-store"   
            });
            const responseData = await response.json();
            const productList: ProductWishlist[] = responseData.data;
            setProducts(prevProducts => [...prevProducts, ...productList]); 
            setPage(prevPage => prevPage + 1);
            setHasMore(productList.length > 0);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProduct(page);
    }, [page]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsSearching(true);
            let response;
            if (searchTerm.trim() !== "") {
                response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products/search/${searchTerm}`, {
                    cache: "no-store"   
                });
            } else {
                setProducts([]);
                setPage(0); 
                setIsSearching(false);
                return;
            }
            const responseData = await response.json();
            const productList: ProductWishlist[] = responseData.data;
            setProducts(productList);
            setPage(50); 
            setHasMore(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="p-5">
                <h1 className="text-2x1 font-bold mb-5">Product Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center mb-5">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="border border-gray-300 rounded-md px-4 py-2"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
                    </div>
                </form>
                {isSearching ? (
                    <div className="text-center">Searching...</div>
                ) : (
                    <InfiniteScroll
                        dataLength={products.length}
                        next={() => fetchProduct(page)}
                        hasMore={!isSearching && hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={<p>No more products to load</p>}
                    >
                        <div className="grid grid-cols-3 gap-4">
                            {products.map((product) => (
                                <ProductsCard product={product} key={product._id} />
                            ))}
                        </div>
                    </InfiniteScroll>
                )}
            </main>
        </>
    );
}
