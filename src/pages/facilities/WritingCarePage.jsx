import FacilityDetailPage from './FacilityDetailPage.jsx'
import { facilities } from '../../data/facilities.js'

export default function WritingCarePage({ navigate }) {
  return <FacilityDetailPage facility={facilities['writing-care']} navigate={navigate} />
}
