import HomePage from '../pages/HomePage.jsx'
import AboutPage from '../pages/about/AboutPage.jsx'
import WhyChoosePage from '../pages/about/WhyChoosePage.jsx'
import AchievementsPage from '../pages/about/AchievementsPage.jsx'
import PartnersPage from '../pages/about/PartnersPage.jsx'
import GalleryPage from '../pages/about/GalleryPage.jsx'
import CoursesPage from '../pages/CoursesPage.jsx'
import FacilitiesPage from '../pages/facilities/FacilitiesPage.jsx'
import AISpeakingZonePage from '../pages/facilities/AISpeakingZonePage.jsx'
import ReadingCarePage from '../pages/facilities/ReadingCarePage.jsx'
import WritingCarePage from '../pages/facilities/WritingCarePage.jsx'
import SpeakingCarePage from '../pages/facilities/SpeakingCarePage.jsx'
import ListeningCarePage from '../pages/facilities/ListeningCarePage.jsx'
import SpeakersCafePage from '../pages/facilities/SpeakersCafePage.jsx'
import OneToOneCounsellingPage from '../pages/facilities/OneToOneCounsellingPage.jsx'
import ExamRegistrationPage from '../pages/ExamRegistrationPage.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

const facilityRoutes = {
  '/facilities/ai-speaking-zone': AISpeakingZonePage,
  '/facilities/reading-care': ReadingCarePage,
  '/facilities/writing-care': WritingCarePage,
  '/facilities/speaking-care': SpeakingCarePage,
  '/facilities/listening-care': ListeningCarePage,
  '/facilities/speakers-cafe': SpeakersCafePage,
  '/facilities/one-to-one-counselling': OneToOneCounsellingPage,
}

export default function renderRoute(route, navigate) {
  if (route === '/') return <HomePage navigate={navigate} />
  if (route === '/about') return <AboutPage navigate={navigate} />
  if (route === '/about/why-choose-us') return <WhyChoosePage navigate={navigate} />
  if (route === '/about/student-achievements') return <AchievementsPage />
  if (route === '/about/partners') return <PartnersPage />
  if (route === '/about/photo-gallery') return <GalleryPage />
  if (route === '/courses') return <CoursesPage navigate={navigate} />
  if (route === '/facilities') return <FacilitiesPage navigate={navigate} />
  if (facilityRoutes[route]) {
    const FacilityPage = facilityRoutes[route]
    return <FacilityPage navigate={navigate} />
  }
  if (route === '/exam-registration') return <ExamRegistrationPage navigate={navigate} />
  if (route === '/contact') return <ContactPage />
  return <NotFoundPage navigate={navigate} />
}
