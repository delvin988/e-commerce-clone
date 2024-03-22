"use client"

import { useFormStatus } from "react-dom"


export function SubmitButton(){
    const {pending} = useFormStatus();

    return(
        <>
            {pending ? (
                <button
                    className="flex w-full justify-center rounded-md bg-indigo-60 px-3 py-1"
                    type="submit"
                    aria-disabled={pending}>
                    Loading ...
                </button>
            ) : (
                <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1"
                    type="submit">
                    Submit
                </button>
            )}
        </>
    )
}
