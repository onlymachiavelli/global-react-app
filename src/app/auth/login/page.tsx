"use client"
import { useState } from "react"
import { Input, Checkbox, Button } from "@nextui-org/react"
import { useAccount } from "@/hooks"
import { Loader } from "@/components/atoms"
import Link from "next/link"

import { Toaster } from "react-hot-toast"
const Page = () => {
  const [isLoading, setLoader] = useState<boolean>(false)
  const { login, loginData, handleLoginForm } = useAccount()
  return (
    <>
      {isLoading && <Loader />}

      <div className="w-full h-screen	 flex items-center justify-center">
        <aside className="w-1/2 h-full bg-[#2B3E6C] hidden lg:flex">
          <div className="w-full h-auto p-5">
            <div className="w-16 relative h-16  rounded flex items-center justify-center ">
              {/* <Image src={Inariam} fill alt={"Inariam Logo"} /> */}
            </div>

            <div className="w-96 m-auto h-96  flex items-center justify-center flex-col">
              {/*@ts-ignore */}
              {/* <Image
              src={svg.src}
              objectFit="fill"
              width={400}
              height={400}
              alt={"SVG LOGO"}
            /> */}
            </div>

            <h1 className="text-white text-xl w-2/3 text-center m-auto py-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              fugit aliquid esse dicta, vitae facilis reprehenderit voluptas
              odit
            </h1>

            <div className="w-full h-auto flex items-center justify-center py-10">
              <Button
                className="text-white px-20 "
                size="md"
                variant="bordered"
              >
                Explore More
              </Button>
            </div>
          </div>
        </aside>
        <aside className="lg:w-1/2 w-full bg-auto h-full  flex items-center justify-between flex-col px-5 relative overflow-hidden">
          <div className="w-full h-auto ">
            <div className="w-36 h-36 bg-none relative">
              {/*@ts-ignore */}
              {/* <Image src={PCP.src} fill alt={"PCP LOGO"} /> */}
            </div>

            <div className="w-full h-auto">
              <div className="md-hidden m-auto relative w-16w h-16 my-5 py-10">
                {/* <Image src={Inariam} alt="Inariam Logo" fill /> */}
              </div>
              <h1 className="text-[#2B3E6C] text-center font-bold text-3xl quick">
                Sign in to Global
              </h1>

              <form
                method="POST"
                onSubmit={async (e: any) => {
                  e.preventDefault()
                  setLoader(true)
                  await login().finally(() => {
                    setLoader(false)
                  })
                }}
              >
                <div className="lg:w-8/12 w-11/12 py-10 h-auto m-auto flex items-center justify-center gap-5 flex-col">
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginForm}
                  />
                  <Input
                    type="password"
                    label="Password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginForm}
                  />
                  <div className="w-full h-auto flex items-center justify-between">
                    <Checkbox size="sm">
                      <label className="text-sm text-[#2B3E6C]">
                        Keep Me Signed In
                      </label>
                    </Checkbox>
                  </div>
                  <Button
                    color="primary"
                    className="w-full quick bg-[#3D5898]"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Button
                    color="primary"
                    className="w-full bg-[#CC4419] quick"
                    as={Link}
                    href="/auth/signup"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>

            <div className="w-full h-auto absolute bottom-5">
              <p className="text-[#9BA4B8] text-sm text-center">
                &copy; 2023 Global | All Right Reserved
              </p>
            </div>
          </div>
        </aside>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default Page
