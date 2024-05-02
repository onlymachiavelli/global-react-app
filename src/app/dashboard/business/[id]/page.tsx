"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useBusiness } from "@/hooks"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/organisms"
import { Navbar } from "@/components/molecules"
import { Loader } from "@/components/atoms"
import { Button, Link } from "@nextui-org/react"
const Page = () => {
  const { getOne, business } = useBusiness()
  const { status, data } = useSession()

  const { id } = useParams()

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/auth/login"
    }
  }, [data, status])

  return (
    <>
      <main className="w-full h-auto flex items-center justify-center">
        <Sidebar ID={id} />
        <aside className="w-10/12 h-auto min-h-screen">
          <Navbar />

          <div className="w-full h-auto flex items-center justify-center py-10 gap-10">
            <Button
              as={Link}
              href={`/dashboard/business/inventory/${id}`}
              color="success"
              className="text-white"
            >
              Inventory
            </Button>
            <Button
              as={Link}
              href={`/dashboard/business/${id}/crm/`}
              color="success"
            >
              CRM
            </Button>
            <Button
              as={Link}
              href={`/dashboard/business/${id}/orders/`}
              color="success"
            >
              Orders
            </Button>
          </div>
        </aside>
      </main>
    </>
  )
}

export default Page
