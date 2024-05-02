"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Sidebar, Stock } from "@/components/organisms"
import { Navbar, InfoCard } from "@/components/molecules"
import { useProducts } from "@/hooks/"
import { Loader } from "@/components/atoms"
import { Button } from "@nextui-org/button"
import { Link } from "@nextui-org/link"
import { FaPlus } from "react-icons/fa6"

const Page = () => {
  const { status, data } = useSession()

  const [isLoading, setLoader] = useState<boolean>(false)

  const { getMines, prods } = useProducts()

  const { id } = useParams()

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/auth/login"
    }
  }, [data, status])
  useEffect(() => {
    setLoader(true)
    if (status === "authenticated") {
      getMines((data as any).jwt as string, id as string).finally(() => {
        setLoader(false)
      })
    }
  }, [data, status])

  return (
    <>
      {(status === "loading" || !prods || isLoading) && <Loader />}
      <main className="w-full h-auto flex items-center justify-center">
        <Sidebar ID={id} />
        <aside className="w-10/12 h-auto min-h-screen overflow-y-hidden">
          <Navbar />

          <div className="w-full h-auto px-10 py-10">
            <InfoCard />

            <h1>List of Products </h1>

            <div className="py-10 px-10">
              <Stock Data={prods} />
            </div>
          </div>

          <Button
            as={Link}
            href={`/dashboard/business/inventory/create/${id}`}
            color="danger"
            className="fixed bottom-10 right-10"
            isIconOnly
          >
            <FaPlus size={10} />
          </Button>
        </aside>
      </main>
    </>
  )
}

export default Page
