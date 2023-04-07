export const formateDate = (dateInNumber: number) => {
  const date = new Date(dateInNumber)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const year = date.getFullYear()
  const formattedDate = `${day} ${month} ${hours}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm} (${year})`
  return formattedDate
}
