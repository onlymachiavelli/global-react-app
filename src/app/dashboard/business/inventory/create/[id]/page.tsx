"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Sidebar, Stock } from "@/components/organisms"
import { Navbar, InfoCard } from "@/components/molecules"
import { Loader } from "@/components/atoms"
import useImage from "@/utils/handleUpload"
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react"
import { FileUploader } from "react-drag-drop-files"
import { useProducts } from "@/hooks"
import { toast, Toaster } from "react-hot-toast"

const fileTypes = ["JPG", "PNG", "GIF"]
const Page = () => {
  const { status, data } = useSession()
  const { image, setImage, setUrl, upload, url } = useImage(true)

  const handleFileChange = (event: any) => {
    if (event.target.files) {
      setImage(event.target.files[0])
    }
  }
  const cats = [
    "Kitchen",
    "Laformatik",
    "Cars",
    "Computers",
    "Phones",
    "Food",
    "Watches",
    "Clothes",
  ]
  const [isLoading, setLoader] = useState<boolean>(false)

  const { id } = useParams()

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/auth/login"
    }
  }, [data, status])

  const { p, handleProdChanges, createProd } = useProducts()

  return (
    <>
      {(status === "loading" || isLoading) && <Loader />}
      <main className="w-full h-auto flex items-center justify-center">
        <Sidebar ID={id} />
        <aside className="w-10/12 h-auto min-h-screen overflow-y-hidden">
          <Navbar />

          <div className="w-full h-auto px-10 py-10">
            <InfoCard />

            <h1 className="text-center text-3xl font-semibold pt-10">
              Add New Product{" "}
            </h1>

            <div className="py-10 px-10">
              <form
                action=""
                className="flex flex-col gap-5 w-1/2 m-auto items-center justify-center"
                onSubmit={async (e: any) => {
                  e.preventDefault()
                  if ((data as any).jwt) {
                    await createProd(
                      (data as any).jwt,
                      String(id),
                      url
                    ).finally(() => {
                      setLoader(false)
                    })
                  }
                }}
              >
                <Input
                  placeholder={"Name of the product"}
                  label="Name of the Product"
                  name="name"
                  value={p.name}
                  onChange={handleProdChanges}
                />

                <Input
                  placeholder={"Price of the product"}
                  label="Price of the Product"
                  name="price"
                  value={p.price}
                  onChange={handleProdChanges}
                />

                <Input
                  placeholder={"Quantity of the product"}
                  label="Quantity of the Product"
                  value={p.quantity}
                  name="quantity"
                  onChange={handleProdChanges}
                />

                <Select
                  label="Select an animal"
                  onChange={handleFileChange}
                  name="category"
                  value={p.category}
                >
                  {cats.map((ct) => (
                    <SelectItem key={ct} value={ct}>
                      {ct}
                    </SelectItem>
                  ))}
                </Select>
                <Textarea
                  label="Description of the Product"
                  placeholder="Description of the Product"
                  name="description"
                  value={p.description}
                  onChange={handleProdChanges}
                ></Textarea>

                {/* <FileUploader
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                /> */}

                <input type="file" onChange={handleFileChange} name="file" />

                {url.length === 0 && (
                  <>
                    <Button
                      color="danger"
                      type="button"
                      onClick={() => {
                        setLoader(true)
                        upload(() => {
                          toast.success(
                            "Done Uploading the image, you can save now"
                          )
                          setLoader(false)
                        })
                        setLoader(false)
                      }}
                    >
                      Upload Image
                    </Button>
                  </>
                )}

                {url.length > 0 && (
                  <>
                    <Button
                      color="success"
                      className="text-white"
                      type="submit"
                    >
                      Save The Product
                    </Button>
                  </>
                )}
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
