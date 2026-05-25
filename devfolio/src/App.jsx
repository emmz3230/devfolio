import { BrowserRouter, Routes, Route } from "react-router-dom"

import AppLayout from "./ui_components/AppLayout";
import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetailPage";
import ProfilePage from "./Pages/ProfilePage";
import SignupPage from "./Pages/SignupPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="blogs/:slug" element={<DetailPage />} />
            <Route path="signup" element={<SignupPage />} />

            {/* <Route path="profile" element={<ProfilePage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

