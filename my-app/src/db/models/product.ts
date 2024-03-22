import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import {z} from "zod"

export type Product = {
    _id: ObjectId
    name: string
    slug: string
    description: string
    excerpt: string
    price: number
    tags: string[]
    thumbnail: string
    images: string[]
    createdAt: string
    updatedAt: string
  }

  const ProductInputSchema = z.object({
    name: z.string(),
    slug: z.string(),
  })

  class ProductModel {
    static getCollection(){
        return getCollection("products")
    }

    // static async getProduct(){
    //   return (await this.getCollection().find().toArray() as Product[])
    // }

    static async getAllProduct(page = 1, limit = 6, searchQuery?: string) {
      const skips = limit * (page - 1);
      let query = {};
  
      if (searchQuery) {
        query = {
          name: { $regex: searchQuery, $options: "i" },
        };
      }
  
      const data = await this.getCollection()
        .find(query)
        .skip(skips)
        .limit(limit)
        .toArray();
  
      const count = await this.getCollection().countDocuments(query);
  
      return {
        data,
        totalData: count,
        page,
        totalPage: Math.ceil(count / limit),
        limit,
      };
    }


    static async getProductSlug(slug: string){
      const search = await this.getCollection().findOne({
        slug: slug
      })
      return search as Product
    }

    static async findName(name: string){
      const regex = new RegExp('^' + name, 'i')
      const searchCursor = await this.getCollection().find({
        name: regex
    }).toArray() as Product[];
      return searchCursor as Product[]
  }

}
  export default ProductModel;