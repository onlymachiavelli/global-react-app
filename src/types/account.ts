interface Login {
  email: string
  password: string
}

interface SignUp {
  email: string
  password: string
  phone: string
  firstname: string
  lastname: string
}

export type { Login, SignUp }
