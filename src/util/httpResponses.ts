export const httpResponses = (status: number) => {
  if (status === 400) {
    return 'you submitted has resulted in an error 400. This typically occurs when there is a problem with the syntax of the request, such as missing or incorrect parameters.'
  } else if (status === 401) {
    return 'you submitted has resulted in an error 401. This typically occurs when you are not authorized to access the requested resource'
  } else if (status === 404) {
    return 'you submitted has resulted in an error 404. The error code 404 indicates that the requested URL or resource does not exist on our server'
  } else if (status === 429) {
    return 'you submitted has resulted in an error 429. This typically occurs when you have exceeded the rate limit for your account'
  } else if (status === 500) {
    return 'you submitted has resulted in an error 500. This typically occurs when there is an internal issue in our server. We advise to try again later.'
  }
}
