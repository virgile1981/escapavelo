'use client'

import { type DifficultyType, DifficultyRecord } from '@escapavelo/shared-types'
import { Bike } from 'lucide-react'
import { useTranslations } from 'next-intl'

type DifficultyIndicatorProps = {
  level: DifficultyType
}

const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({ level }) => {
  const t = useTranslations('destination')
  const value = DifficultyRecord[level];
  return (
    <div className="flex" role="img" aria-label={t("difficultyMessage", { level })}>
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
