import FacilityDetailPage from './FacilityDetailPage.jsx'
import { facilities } from '../../data/facilities.js'

export default function ListeningCarePage({ navigate }) {
  return <FacilityDetailPage facility={facilities['listening-care']} navigate={navigate} />
}
