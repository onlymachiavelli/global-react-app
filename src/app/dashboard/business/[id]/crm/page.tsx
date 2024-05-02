"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useProducts, useClient } from "@/hooks"
import { useSession } from "next-auth/react"
import { Sidebar, Clients } from "@/components/organisms"
import { Navbar, InfoCard } from "@/components/molecules"
import { Loader } from "@/components/atoms"
import { Toaster } from "react-hot-toast"

import { Button, Link } from "@nextui-org/react"

const Page = () => {
  const { status, data } = useSession()
  const { clients, fetchClient } = useClient()
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
      fetchClient((data as any).jwt, String(id)).finally(() => setLoader(false))
    }
  }, [data, status])

  return (
    <>
      {isLoading && <Loader />}
      <main className="w-full h-auto flex items-center justify-center">
        <Sidebar ID={id} />
        <aside className="w-10/12 h-auto min-h-screen">
          <Navbar />

          <div className="w-full h-auto px-10 py-10">
            <InfoCard />

            <h1>List of Products </h1>

            <div className="py-10 px-10">
              <Clients Data={clients} />
            </div>
          </div>

          <Button
            className="fixed bottom-10 right-10 "
            color="danger"
            as={Link}
            href={` /dashboard/business/${id}/crm/send`}
          >
            Broadcast
          </Button>
        </aside>
      </main>

      <Toaster reverseOrder={false} position="top-right" />
    </>
  )
}

export default Page
