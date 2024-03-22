import Image from "next/image";

function HomeBanner() {
   return (
    <div className="relative bg-gradient-to-r from-gray-800 to-black-900 mb-8">
    <div className="container mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-center">
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">NEW! LYNN THOMPSON SIGNATURE TI-LITE</h1>
        <p className="text-lg md:text-xl text-white mb-6">The Lynn Thompson Signature Cold Steel Ti-Lite folding knife is a true masterpiece created in collaboration with Lynn Thompson.</p>
        <a href="/products" className="inline-block py-2 px-6 text-lg font-semibold bg-green-400 text-white rounded hover:bg-green-500 transition duration-300">
          Shop Now
        </a>
      </div>  
            <div className="md:w-1/2 w-full relative aspect-w-3 aspect-h-2">
               <Image
                  src="/banner.png"
                  alt="Banner Image"
                  layout="responsive"
                  width={1000}
                  height={500}
                  objectFit="cover"
                  className="rounded-lg"
               />
            </div>
         </div>
      </div>
   );
}

export default HomeBanner;
