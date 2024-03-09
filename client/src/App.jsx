import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import SignIn from './pages/SignIn'
import LogIn from './pages/LogIn'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import PostPrivate from './components/PostPrivate'
import Post from './pages/Post'
import PostUpdate from './components/PostUpdate'
import PostView from './pages/PostView'
import CommentSection from './components/CommentSection'
import Search from './pages/Search'

function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='search' element={<Search/>}/>
        <Route element={<PrivateRoute/>} >
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        <Route element={<PostPrivate/>}>
          <Route path='/post' element={<Post/>} />
        </Route>
        <Route path='/update/:id' element={<PostUpdate/>}/>
        <Route path='/postview/:id' element={<PostView/>}/>
        <Route path='/comment' element={<CommentSection/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
