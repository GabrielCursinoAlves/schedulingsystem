export type UserParams = {
  username: string,
  password: string,
  email: string,
  phone: string
}

export type UserReturns = UserParams & {
  created_at: Date,
  id: string
}