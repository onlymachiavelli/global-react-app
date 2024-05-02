"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useProducts, useOrders } from "@/hooks"
import { useSession } from "next-auth/react"
import { Sidebar, Orders } from "@/components/organisms"
import { Navbar, InfoCard } from "@/components/molecules"
import { Loader } from "@/components/atoms"

const Page = () => {
  const { status, data } = useSession()
  const { orders, getAll } = useOrders()
  const [isLoading, setLoader] = useState<boolean>(false)

  const { id } = useParams()

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/auth/login"
    }
  }, [data, status])

  useEffect(() => {
    if (data && status === "authenticated") {
      setLoader(true)
      getAll((data as any).jwt, String(id)).finally(() => setLoader(false))
    }
  }, [data, status])

  return (
    <>
      <main className="w-full h-auto flex items-center justify-center">
        <Sidebar ID={id} />
        <aside className="w-10/12 h-auto min-h-screen">
          <Navbar />

          <div className="w-full h-auto px-10 py-10">
            <InfoCard />

            <h1>List of Products </h1>

            <div className="py-10 px-10">
              <Orders Data={orders} />
            </div>
          </div>
        </aside>
      </main>
    </>
  )
}

export default Page
