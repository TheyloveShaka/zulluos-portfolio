const LEAD = 'Redesign concept'
const REST = ' · A direction I proposed for this brand, not their current live site.'

function ConceptBadge() {
  return (
    <span className="concept-badge">
      <span className="concept-badge__lead">{LEAD}</span>
      {REST}
    </span>
  )
}

export default ConceptBadge
