import FacilityDetailPage from './FacilityDetailPage.jsx'
import { facilities } from '../../data/facilities.js'

export default function AISpeakingZonePage({ navigate }) {
  return <FacilityDetailPage facility={facilities['ai-speaking-zone']} navigate={navigate} />
}
