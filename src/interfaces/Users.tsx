export interface IUsers {
  items: [
    {
      userid: string
      name: string
      email: string
      namelast: string
      namefirst: string
      datecreated: number
      datemodified: number
    }
  ]
  totalCount: number
}
export const initialUsers: IUsers = {
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
  totalCount: 0,
}
