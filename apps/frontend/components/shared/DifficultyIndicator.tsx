'use client'

import { type DifficultyType, DifficultyRecord } from '@escapavelo/shared-types'
import { Bike } from 'lucide-react'

type DifficultyIndicatorProps = {
  level: DifficultyType
}

const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({ level }) => {
  const value = DifficultyRecord[level];
  return (
    <div className="flex" aria-label="Niveau de difficulté">
      {
        Object.values(DifficultyRecord).map((n) => {
          return (<Bike
            key={n}
            size={24}
            className={`bike ${n <= value ? 'active' : ''}`}
          />)
        }
        )}
    </div>
  )
}

export default DifficultyIndicator
