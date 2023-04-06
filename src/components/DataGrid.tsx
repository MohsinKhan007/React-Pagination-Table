interface IColumnType<T> {
  field: keyof T
  headerName: string
  width: number
}
interface Props<T> {
  data: T[]
  columns: IColumnType<T>[]
}
export const dataGrid = () => {}
