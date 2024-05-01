import { useState } from "react"
import axios, { AxiosResponse, AxiosError } from "axios"
import { toast } from "react-hot-toast"
import { CreateProd } from "@/types/products"

interface Product {
  id: 1
  business_id: number
  name: string
  price: number
  quantity: number
  description: string
  image: string
  category: string
  disabled: boolean
  created_at: number
  updated_at: number
}
const useProducts = () => {
  const [prods, setProds] = useState<any>()
  const getMines = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Error getting the token ")
    }
    if (!id || id == "0") {
      throw new Error("Error getting the id or the id is invalid")
    }
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data)
        setProds(r.data)
      })
      .catch((e: AxiosError) => {
        toast.error(e.message)
      })
  }

  const [p, setP] = useState<CreateProd>({
    name: "",
    image: "",
    description: "",
    price: "0",
    quantity: "0",
    category: "",
  })
  const handleProdChanges = (e: any) => {
    setP({ ...p, [e.target.name]: e.target.value })
  }
  const createProd = async (token: string, id: string, image: string) => {
    if (!token) {
      throw new Error("couldn't get the token ")
    }
    if (!id) {
      throw new Error("Error getting the id of the business")
    }
    if (!image) {
      throw new Error("Error getting the image")
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND}/products/${id}`,
        {
          name: p.name,
          image: image,
          description: p.description,
          price: Number(p.price),
          quantity: Number(p.quantity),
          category: p.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((r: AxiosResponse) => {
        if (r.status === 200) {
          toast.success("Product created successfully")
          window.location.href = `/dashboard/business/inventory/${id}`
        } else {
          toast.error("Error creating the product")
        }
      })
      .catch((e: AxiosError) => {
        toast.error(e.message)
      })
  }

  //delete product
  const removeProd = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Error getting the token")
    }
    if (!id) {
      throw new Error("Error getting the id")
    }
    await axios
      .delete(`${process.env.NEXT_PUBLIC_BACKEND}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r: AxiosResponse) => {
        if (r.status === 200) {
          toast.success("Product deleted successfully")
          window.location.reload()
        } else {
          toast.error("Error deleting the product")
        }
      })
      .catch((e: AxiosError) => {
        toast.error(e.message)
      })
  }

  return {
    prods,
    getMines,

    //create product
    p,
    handleProdChanges,
    createProd,
    removeProd,
  }
}

export default useProducts
