"use client"
import { useState, useEffect } from "react"
import { Sidebar, BusinessTable } from "@/components/organisms"
import { Navbar } from "@/components/molecules"
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { Loader } from "@/components/atoms"
import { useBusiness } from "@/hooks/"

import { useSession } from "next-auth/react"
import { Toaster } from "react-hot-toast"

const Page = () => {
  const { create, createData, handleDataInput } = useBusiness()
  const { data, status } = useSession()
  const [isLoading, setLoader] = useState<boolean>(false)
  useEffect(() => {
    if (status === "unauthenticated" || data === null) {
      window.location.href = "/auth/login"
    }
  }, [status, data])
  return (
    <>
      {(isLoading || status === "loading") && <Loader />}
      <main className="w-full h-auto min-h-screen flex items-center justify-center">
        <Sidebar />
        <aside className="w-10/12  h-screen overflow-hidden">
          <Navbar />
          <div className="w-full h-full flex items-center justify-between flex-col px-10 py-1 ">
            <div className="w-full">
              <h1 className="text-3xl font-semibold text-center py-10">
                Create Profile Form
              </h1>
              <form
                method="post"
                onSubmit={async (e: any) => {
                  e.preventDefault()
                  setLoader(true)
                  await create((data as any).jwt as string).finally(() => {
                    setLoader(false)
                  })
                }}
                className="w-1/2 m-auto flex flex-col gap-5"
              >
                <Input
                  placeholder="Business Name"
                  label="Business Name"
                  value={createData.name}
                  onChange={handleDataInput}
                  name="name"
                />
                <Input
                  placeholder="Business Name"
                  label="Address"
                  value={createData.address}
                  onChange={handleDataInput}
                  name="address"
                />
                <Input
                  placeholder="Phone Number"
                  label="Phone Number"
                  value={createData.phone}
                  onChange={handleDataInput}
                  name="phone"
                />
                <Input
                  placeholder="Email"
                  label="Email"
                  value={createData.email}
                  name="email"
                  onChange={handleDataInput}
                />
                <Textarea
                  placeholder="Description"
                  label="Description"
                  value={createData.description}
                  name="description"
                  onChange={handleDataInput}
                ></Textarea>
                <Button color="success" className="text-white" type="submit">
                  Create the Business Profile
                </Button>
              </form>
            </div>
          </div>
        </aside>
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default Page
