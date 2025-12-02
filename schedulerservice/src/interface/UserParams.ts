export interface BaseUser {
  username: string,
  email: string,
  phone: string,
  password: string
}

export interface UserParams extends BaseUser {}

export interface UserReturns extends BaseUser{
  id: string,
  createdAt: Date
}