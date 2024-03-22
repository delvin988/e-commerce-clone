import ClientFlashComponent from '@/components/ClientFlashComponent';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
export const dynamic = "force-dynamic";


export default function LoginPage() {

    const handleLogin = async (formData: FormData) =>{
        "use server";
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })

        const result = await response.json()

        if(!response.ok){
            return redirect('/login?error=' + result.error)
        }
        cookies().set("Authorization", `Bearer ${result.data.accessToken}`)
        return redirect('/products')
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 md:p-8 shadow-md rounded-lg" style={{ maxWidth: "800px" }}>
        <div className="md:flex md:flex-row">
          <div className="md:w-1/2 md:pr-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <ClientFlashComponent/>
            <form action={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full md:w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="password" id="password" name="password" className="shadow appearance-none border rounded w-full md:w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
                  Sign In
                </button>
                <div className="text-sm">
                  <Link href="/register">
                    <span className="text-blue-500 hover:underline cursor-pointer ml-2">register here</span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 md:pl-4 mx-auto">
            <div className="bg-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Existing Customer?</h3>
              <p className="text-sm mb-4">If you had a user account prior to our mid-December website re-launch, you will need to register for a new account.</p>
              <h3 className="text-lg font-semibold mb-2">New Customer?</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Check out faster</li>
                <li>Save multiple shipping addresses</li>
                <li>Access your order history</li>
                <li>Track new orders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
