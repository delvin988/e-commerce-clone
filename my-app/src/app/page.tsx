import Image from 'next/image';
import Link from 'next/link';
import { ProductWishlist } from './interfaces/productInterfaces';
import ProductsCardHome from '@/components/productCardHome';
import Navbar from '@/components/navbar';
import HomeBanner from '@/components/Banner';
export const dynamic = "force-dynamic";


export default async function Home() {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL +`/api/products`, {
        cache: "no-cache"
    });
    const products: {data: ProductWishlist[]} = await response.json();

    return (
      <>
      <Navbar/>
      <HomeBanner/>
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex items-center justify-center mb-8">
                <Image src="/cs-spartan.jpg" alt="Company Logo" width={320} height={320} className="mr-8" />
                <div>
                    <h1 className="text-3xl font-bold mb-4 text-center">Cold Steel Company Profile</h1>
                    <p className="text-center text-gray-700">
                        Cold Steel is a company dedicated to making the strongest, sharpest knives in the world. Over the last three decades, Cold Steel has been at the forefront of the many innovations that have helped to define the knife industry. Progressive accomplishment, including the introduction of the checked Kraton® handles, and the tanto point blade styles have gone from curiously interesting features to industry-wide hallmarks of quality and sophistication. New ground was also broken with the introduction of unique new blade steels like San Mai III® and Tri-Ad™ Lock & locking mechanism for folding knives. Tri-Ad™ Lock for example, has never been equaled by any of Cold Steels competitors and nothing they have produced yet has been proven to outperform it. Of course Cold Steel will always look to the future, constantly striving to make the world strongest, sharpest knives. That goal as elusive and difficult to achieve as it is, has been the same for the past forty years.
                    </p>
                    <p className="text-center text-gray-700">
                        Cold Steel Inc. is a knife and tool company dedicated to creating the world strongest, sharpest knives, swords, tomahawks, machetes, cutlery, tools for every day carry: EDC. Quickly adopted by Military, Law Enforcement Special units, Emergency Services Personnel, Self Defense professionals as well as members of the Martial Arts community, Cold Steel quickly became renowned for quality, strength, reliability and dependability in every day carry (EDC). Our diverse and varied line-up quickly grew to include not only a massive selection of folding knives (from smaller EDC blades, to our iconic giant “mega-folders”) but fixed blades, swords, sabers, pole-arms and halberds, as well as hunting gear, spears, blowguns, axes, machetes, tomahawks and tools!
                    </p>
                    <p className="text-center text-gray-700">
                        Over the decades, Cold Steel has introduced pioneering new materials and designs that have helped to shape the world of the modern knife, edged weapons and tools. From the introduction of the checkered Kraton® handles, and the “Americanized” Tanto blade, to the inclusion of innovative new blade steels like San Mai III® and game-changing locking mechanisms (like our Tri-Ad™ Lock). As we look to the future, Cold Steel continues to bring new levels of strength, safety and performance to the market, providing tried and tested products that you can rely on Anytime, Anywhere!
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products?.data.slice(0, 6).map((product) => (
                    <ProductsCardHome product={product} key={product._id}/>
                ))}
            </div>
            <div className="mt-8">
                <Link href="/products">
                    <button className="btn btn-primary">See All Products</button>
                </Link>
            </div>
        </main>
      </>
    );
}
