import { useState } from "react"
import axios, { AxiosResponse } from "axios"
import { toast } from "react-hot-toast"

import { CreateBusiness } from "@/types/business"
import { signOut } from "next-auth/react"

const useBusiness = () => {
  const [createData, setCreateData] = useState<CreateBusiness>({
    name: "",
    address: "",
    category: "",
    description: "",
    email: "",
    phone: "",
  })

  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateData({
      ...createData,
      [e.target.name]: e.target.value,
    })
  }

  const create = async (token: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
    try {
      const createRes: AxiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/business`,
        createData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (createRes.status === 200) {
        toast.success("Done creating the business")
      } else {
        toast.error(createRes.data.message || "Something went wrong")
      }

      if (createRes.status === 401) await signOut()
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  const getMine = async (token: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
  }

  return {
    create,
    handleDataInput,
    createData,
  }
}

export default useBusiness
