"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useProducts, useClient } from "@/hooks"
import { useSession } from "next-auth/react"
import { Sidebar, Clients } from "@/components/organisms"
import { Navbar, InfoCard } from "@/components/molecules"
import { Loader } from "@/components/atoms"
import { Toaster } from "react-hot-toast"
import { Textarea, Input, Button } from "@nextui-org/react"

const Page = () => {
  const { status, data } = useSession()
  const { sendMail, mailData, handleChanges } = useClient()
  const [isLoading, setLoader] = useState<boolean>(false)

  const { id } = useParams()

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/auth/login"
    }
  }, [data, status])

  return (
    <>
      {isLoading && <Loader />}
      <main className="w-full h-auto flex items-center justify-center">
        <Sidebar />
        <aside className="w-10/12 h-auto min-h-screen">
          <Navbar />

          <div className="w-full h-auto px-10 py-10">
            <InfoCard />

            <h1>List of Products </h1>

            <div className="py-10 px-10">
              <h1 className="text-center font-semibold pb-10 text-3xl">
                Broadcase Email to All Consumers
              </h1>
              <form
                onSubmit={async (e: any) => {
                  e.preventDefault()

                  if ((data as any).jwt) {
                    setLoader(true)
                    await sendMail((data as any).jwt, id as string).finally(
                      () => {
                        setLoader(false)
                      }
                    )
                  }
                }}
                className="w-1/2 m-auto flex flex-col gap-5"
              >
                <Input
                  type="text"
                  placeholder="Subject"
                  label="Subject"
                  name="subject"
                  value={mailData.subject}
                  onChange={handleChanges}
                />
                <Textarea
                  label="Message"
                  placeholder="Message"
                  value={mailData.message}
                  name="message"
                  onChange={handleChanges}
                ></Textarea>

                <Button color="danger" type={"submit"}>
                  Broadcast Email
                </Button>
              </form>
            </div>
          </div>
        </aside>
      </main>

      <Toaster reverseOrder={false} position="top-right" />
    </>
  )
}

export default Page
