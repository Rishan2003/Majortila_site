import { facilities } from '../data/facilities.js'

export default function pageTitle(route) {
  const map = {
    '/': "Hexa's Majortila | IELTS & English in Sylhet",
    '/about': "About Us | Hexa's Majortila",
    '/about/why-choose-us': "Why Choose Us | Hexa's Majortila",
    '/about/student-achievements': "Student Achievements | Hexa's Majortila",
    '/about/partners': "Our Partners | Hexa's Majortila",
    '/about/photo-gallery': "Photo Gallery | Hexa's Majortila",
    '/courses': "Our Courses | Hexa's Majortila",
    '/facilities': "Facilities | Hexa's Majortila",
    '/exam-registration': "Exam Registration | Hexa's Majortila",
    '/contact': "Contact | Hexa's Majortila",
  }
  if (route.startsWith('/facilities/')) {
    return `${facilities[route.split('/').pop()]?.title || 'Facilities'} | Hexa's Majortila`
  }
  return map[route] || "Hexa's Majortila"
}
