import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/routes/Home'
import Archive from './components/routes/Archive'
import MainLayout from './layouts/MainLayout'
import PageNotFound from './components/routes/PageNotFound'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="archive" element={<Archive />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
