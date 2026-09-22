import FacilityDetailPage from './FacilityDetailPage.jsx'
import { facilities } from '../../data/facilities.js'

export default function ReadingCarePage({ navigate }) {
  return <FacilityDetailPage facility={facilities['reading-care']} navigate={navigate} />
}
