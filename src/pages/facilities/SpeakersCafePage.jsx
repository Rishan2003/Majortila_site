import FacilityDetailPage from './FacilityDetailPage.jsx'
import { facilities } from '../../data/facilities.js'

export default function SpeakersCafePage({ navigate }) {
  return <FacilityDetailPage facility={facilities['speakers-cafe']} navigate={navigate} />
}
