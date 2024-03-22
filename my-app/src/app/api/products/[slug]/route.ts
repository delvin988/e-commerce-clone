import ProductModel from "@/db/models/product"

export async function GET(request: Request, 
    {params}: {params: {slug: string} }) {
    
    const data = await ProductModel.getProductSlug(params.slug)

    return Response.json({
        data,
    })
}
