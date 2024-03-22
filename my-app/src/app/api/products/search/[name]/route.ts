import ProductModel from '@/db/models/product';

export async function GET(request: Request, 
    {params}: {params: {name: string} }) {
    try {        
        const product = await ProductModel.findName(params.name);
        return Response.json({
            data: product
        });
    } catch (error) {
        console.error(error);
    }
}
