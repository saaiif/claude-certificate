import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { MockExams } from './pages/MockExams'
import { MockExam } from './pages/MockExam'
import { Resources } from './pages/Resources'
import { Tips } from './pages/Tips'
import { MyJourney } from './pages/MyJourney'
import { StudyGuide } from './pages/StudyGuide'
import { NotFound } from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/mock-exams" element={<MockExams />} />
          <Route path="/mock-exams/:certId" element={<MockExam />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/my-journey" element={<MyJourney />} />
          <Route path="/study-guide" element={<StudyGuide />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
