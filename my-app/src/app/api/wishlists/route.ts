import WishlistModel, { NewWishlistInput } from "@/db/models/wishlist";
import { ZodError } from "zod";


export async function POST(request: Request) {
    try {    
       
       const userIdd = request.headers.get("x-id-user") as string
       const body = await request.json() as NewWishlistInput
       console.log(body.productId);

     if (body.productId){
      const wishlist = await WishlistModel.findWishlist(userIdd,body.productId.toString())
  
      if(wishlist){
        return Response.json({
           error: "This item already at your wishlist"
        },{
           status: 400
        })
      }
     }
     
     const result = await WishlistModel.createWishlist({
      userId: userIdd,
      productId: body.productId
     })
 
     return Response.json({
         data: result,
     })
 
    } catch (error) {
       if (error instanceof ZodError) {
          const err = error.issues[0].path + " " + error.issues[0].message;
          return Response.json(
             {
                error: err,
             },
             {
                status: 400,
             }
          );
       }
    }
 }
 

export async function GET(request: Request){
    try {
      const userIdd = request.headers.get("x-id-user") as string
      const wishlist = await WishlistModel.getAllWishlist(userIdd);
      return Response.json({data: wishlist})
    } catch (error) {
        console.log(error);
        return Response.json({
            error: "Internal server error"
        },{
            status: 500
        })
        
    }
}