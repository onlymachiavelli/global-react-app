import { useState } from "react"
import axios, { AxiosResponse, AxiosError } from "axios"
import { toast } from "react-hot-toast"
const useClient = () => {
  const [clients, setClient] = useState([])

  const fetchClient = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Error getting the token")
    }
    if (!id) {
      throw new Error("Error getting the id ")
    }

    await axios(`${process.env.NEXT_PUBLIC_BACKEND}/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r: AxiosResponse) => {
        setClient(r.data)
      })
      .catch((e: AxiosError) => {
        toast.error(e.response?.data as string)
      })
  }

  return {
    clients,
    fetchClient,
  }
}

export default useClient
