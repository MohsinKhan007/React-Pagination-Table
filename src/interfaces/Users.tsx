export interface IUser {
  userid: string
  name: string
  email: string
  namelast: string
  namefirst: string
  datecreated: number
  datemodified: number
}
export type UserFetchData = {
  items: IUser[]
  totalcount: number
}
export type typemodifiedUser = {
  userid: string
  name: string
  email: string
  datecreated: string
  datemodified: string
}
export const initialTypeModifiedUser: typemodifiedUser[] = [
  {
    userid: '',
    name: '',
    email: '',
    datecreated: '',
    datemodified: '',
  },
]
export const initialUsersArray: IUser[] = [
  {
    userid: '',
    name: '',
    email: '',
    namelast: '',
    namefirst: '',
    datecreated: 0,
    datemodified: 0,
  },
]

export const initialUserFetchData: UserFetchData = {
  items: [
    {
      userid: '',
      name: '',
      email: '',
      namelast: '',
      namefirst: '',
      datecreated: 0,
      datemodified: 0,
    },
  ],
  totalcount: 0,
}
