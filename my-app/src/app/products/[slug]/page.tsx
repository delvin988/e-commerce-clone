import AddWishlistButton from "@/components/addToWishlist";
import Navbar from "@/components/navbar";
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const product = await ProductSlug(slug);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}


async function ProductSlug(slug: string) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const productData = await response.json();
    return productData;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function Page( {params} : {params: {slug: string}}) {
  const { slug } = params;
  
  const product = await ProductSlug(slug);

  return (
    <>
      <Navbar />
      {product && (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-16">
          <div className="px-6 py-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {product.data.name}
            </h2>
            <p className="text-base text-gray-600 mb-4">{product.data.description}</p>
            <p className="text-lg font-bold text-gray-800">Price: ${product.data.price}</p>
          </div>
          <div className="flex justify-center mt-4">
            <div className="relative">
              <Image
                src={product.data.thumbnail || "/placeholder.png"}
                alt={product.data.name || "Product thumbnail"}
                width={400}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-2 py-1 rounded-lg shadow-md">
                <p className="text-sm font-semibold text-gray-800">
                  {product.data.name}
                </p>
                <p className="text-xs text-gray-600">
                  {product.data.excerpt}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6 mb-4">
            {product.data && <AddWishlistButton product={product.data} />}
          </div>
        </div>
      )}
    </>
  );
}
