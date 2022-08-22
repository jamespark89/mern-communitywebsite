import { useParams } from "react-router-dom"

function HouseShow() {
  const { id } = useParams()
  return <div>HouseShow{id}</div>
}

export default HouseShow
