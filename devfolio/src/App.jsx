import { BrowserRouter, Routes, Route} from "react-router-dom"

import AppLayout from "./ui_components/AppLayout";
import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetailPage";
import ProfilePage from "./Pages/ProfilePage";




function App() {
  return (
    
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<AppLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path="/" element={<DetailPage/>} />
      <Route path="/" element={<ProfilePage/>} />


      </Route>
    </Routes>
    
    
    
    </BrowserRouter>
  )
}

export default App

