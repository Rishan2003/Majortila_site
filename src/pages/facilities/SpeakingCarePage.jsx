import FacilityDetailPage from './FacilityDetailPage.jsx'
import { facilities } from '../../data/facilities.js'

export default function SpeakingCarePage({ navigate }) {
  return <FacilityDetailPage facility={facilities['speaking-care']} navigate={navigate} />
}
