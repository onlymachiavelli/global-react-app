"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast, Toaster } from "react-hot-toast"
import { Loader } from "@/components/atoms"
import { Button } from "@nextui-org/react"
import { useProducts } from "@/hooks"
const Page = () => {
  const { id } = useParams()
  const { removeProd } = useProducts()
  const [isLoading, setLoader] = useState<boolean>(false)
  const { data, status } = useSession()
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/auth/login"
    }
  }, [data, status])
  return (
    <>
      {isLoading && <Loader />}
      <main className="w-full h-screen flex items-center justify-center ">
        <Button
          color="danger"
          onClick={async () => {
            if ((data as any).jwt) {
              setLoader(true)
              await removeProd((data as any).jwt, id as string).finally(() => {
                setLoader(false)
                toast.success("Done deleting the Product")

                window.history.back()
              })
            }
          }}
        >
          Delete Product ?
        </Button>
      </main>
    </>
  )
}

export default Page
