import UserModel, { NewUserInput } from "@/db/models/user"
import { ZodError } from "zod";
export const dynamic = "force-dynamic";


export async function POST(request: Request){
    try {
        const body = await request.json() as NewUserInput
        if(body.email){
            const findUniqueEmail = await UserModel.findUserByEmail(body.email)
            if(findUniqueEmail){
                return Response.json({
                    error: "Email must be unique"
                },{
                    status: 400
                })
            }
        }
        if(body.username){
            const findUniqueUsername = await UserModel.findUserByUsername(body.username)
            if(findUniqueUsername){
                return Response.json({
                    error: "Username must be unique"
                },{
                    status: 400
                })
            }
        }
        const result = await UserModel.createUser(body)
        return Response.json({
            data: result,
        })
    } catch (error) {
        if(error instanceof ZodError){
            const err = error.issues[0].path + ' ' + error.issues[0].message
            return Response.json(
                {
                    error: err
                },
                {
                    status: 400
                }
            )
        }
    }
}
