import { JENIDataProperties } from "../types/JENIDataProperties"

const ZipcodeMetadata = (area: JENIDataProperties) => {
  return (
    <div className="mt-4 text-sm h-32">
      <div>
        Neighborhood: <strong data-testid="neighborhood">{area?.neighborhood} </strong>{" "}
      </div>
      <div>
        Justice Equity Need Index Rank: <strong>{area?.jenirank}</strong>
      </div>
      <div>
        Service Planning Area: <strong>{area?.spa} </strong>{" "}
      </div>
      <div>
        Supervisorial District: <strong>{area?.sup_dist} </strong>{" "}
      </div>
      <div>
        Countywide Statistical Area: <strong>{area?.csa} </strong>{" "}
      </div>
    </div>
  )
}

export default ZipcodeMetadata
