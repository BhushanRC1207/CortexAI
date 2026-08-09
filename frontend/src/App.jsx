// import React from 'react'
// import Home from './pages/Home'
// import api from "../utils/axios"

// function App() {
//   return (
//     <>
//       <Home />
//     </>
//   )
// }

// export default App

import React from 'react'
import {auth, googleProvider} from "../utils/firebase"
import api from "../utils/axios"
import Home from './pages/Home'
import { useEffect } from 'react'
import getCurrentuser from './features/getCurrentUser'
import { useDispatch } from 'react-redux'
import { setUserdata } from './redux/userSlice'

function App() {

const dispatch = useDispatch()

useEffect(()=>{
  const getUser = async () => {
    const data = await getCurrentuser()
    dispatch(setUserdata(data))
  }
  getUser()
}, [])

  return (
    <>
      <Home />
    </>
  )
}

export default App