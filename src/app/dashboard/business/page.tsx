"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Sidebar, BusinessTable } from "@/components/organisms"
import { Navbar } from "@/components/molecules"
import { Loader } from "@/components/atoms"
import { Toaster } from "react-hot-toast"
import { useBusiness } from "@/hooks"
const Page = () => {
  const { data, status } = useSession()

  const [loading, setLoader] = useState<boolean>(false)
  useEffect(() => {
    if (status === "unauthenticated" || data === null) {
      window.location.href = "/auth/login"
    }
  }, [status, data])

  const { businesses, setBusinesses, getMine } = useBusiness()
  useEffect(() => {
    setLoader(true)
    if (status === "authenticated" && data) {
      getMine((data as any).jwt as string).finally(() => {
        setLoader(false)
      })
    }
  }, [data, status])
  return (
    <>
      {loading || (status === "loading" && <Loader />)}
      <main className="w-full h-auto min-h-screen flex items-center justify-center">
        <Sidebar />
        <aside className="w-10/12  h-screen overflow-hidden">
          <Navbar />

          <div className="w-full h-full px-10 py-10">
            <BusinessTable businesses={businesses?.businesses} />
          </div>
        </aside>
      </main>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default Page
