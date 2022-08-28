import { useParams } from "react-router-dom"

function HouseEdit() {
  const { id } = useParams()

  return <div>HouseEdit{id}</div>
}

export default HouseEdit
