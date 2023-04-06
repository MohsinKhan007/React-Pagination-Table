export interface IUsers {
  items: [
    {
      id: string
      name: string
      email: string
      dateCreated: Date
      dateModified: Date
    }
  ]
  totalCount: number
}
export const initialUsers: IUsers = {
  items: [
    {
      id: '',
      name: '',
      email: '',
      dateCreated: new Date(),
      dateModified: new Date(),
    },
  ],
  totalCount: 0,
}
