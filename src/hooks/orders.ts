import { useState } from "react"
import { CreateOrder } from "@/types/orders"
import axios, { AxiosResponse, AxiosError, Axios } from "axios"
import { toast } from "react-hot-toast"
const useOrders = () => {
  const [orders, setOrders] = useState([])
  const getAll = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Error getting the token")
    }
    if (!id) {
      throw new Error("Error getting the id")
    }

    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r: AxiosResponse) => {
        setOrders(r.data)
      })
      .catch((e: AxiosError) => {})
  }

  return {
    orders,
    getAll,
  }
}

export default useOrders
