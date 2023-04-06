import React, { useEffect } from 'react'
import { Api } from './service/users.service'

function App() {
  useEffect(() => {
    console.log(Api.getUsers())

    return () => {}
  }, [])

  return <div className=""></div>
}

export default App
