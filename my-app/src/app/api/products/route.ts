import ProductModel from "@/db/models/product"

// export async function GET(request: Request){
//     const data = await ProductModel.getProduct()
//     return Response.json({
//         data
//     })
// }

export async function GET(request: Request) {
    const url = new URL(request.url);
  
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "6", 10);
    const searchQuery = url.searchParams.get("search") || "";
  
    const { data, totalData, totalPage } = await ProductModel.getAllProduct(
      page,
      limit,
      searchQuery
    );
  
    return Response.json({
      page,
      limit,
      totalData,
      totalPage,
      data,
    });
  }
