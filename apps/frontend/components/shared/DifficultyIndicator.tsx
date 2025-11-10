'use client'

import { Bike } from 'lucide-react'

type DifficultyIndicatorProps = {
  level: number
}

const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({ level }) => {
  return (
    <div className="flex" aria-label="Niveau de difficulté">
      {[1, 2, 3].map((n) => (
        <Bike
          key={n}
          size={24}
          className={`bike ${n <= level ? 'active' : ''}`}
        />
      ))}
    </div>
  )
}

export default DifficultyIndicator
