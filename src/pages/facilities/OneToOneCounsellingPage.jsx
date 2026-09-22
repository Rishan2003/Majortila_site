import FacilityDetailPage from './FacilityDetailPage.jsx'
import { facilities } from '../../data/facilities.js'

export default function OneToOneCounsellingPage({ navigate }) {
  return <FacilityDetailPage facility={facilities['one-to-one-counselling']} navigate={navigate} />
}
