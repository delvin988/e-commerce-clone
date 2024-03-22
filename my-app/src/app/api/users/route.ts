import UserModel from "@/db/models/user"

export async function GET(request: Request){
    const data = await UserModel.findUsers()
    return Response.json({
        data,
    })
}
