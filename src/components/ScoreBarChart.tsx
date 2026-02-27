import { useMemo } from 'react'
import { useTheme } from 'styled-components'

interface Props {
  distribution: number[]
}

export default function ScoreBarChart({ distribution }: Props) {
  const theme = useTheme()

  const normalizedDistribution = useMemo(() => {
    if (distribution.length === 10) return distribution
    return Array(10).fill(0)
  }, [distribution])

  const maxCount = Math.max(...normalizedDistribution, 1)

  return (
    <section
      style={{
        width: '100%',
        height: '100%',
        minWidth: 0,
        borderRadius: 10,
        border: `1px solid ${theme.colors.grayBackground}`,
        background: `linear-gradient(160deg, ${theme.colors.darkPurpleOp} 0%, ${theme.colors.darkBackgroundStrong} 100%)`,
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <h4
        style={{
          margin: 0,
          color: theme.colors.textWhite,
          fontSize: theme.fontSizes.bigFontSize,
          lineHeight: 1.1,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        Score Distribution
      </h4>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: '6px 2px 2px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 6,
          width: '100%',
        }}
      >
        {normalizedDistribution.map((count, index) => {
          const ratio = count / maxCount
          const barHeight = count === 0 ? 10 : Math.max(14, Math.round(12 + ratio * 56))
          const hue = Math.round(12 + (index / 9) * 98)

          return (
            <div
              key={index}
              title={`Score ${index + 1}: ${count} vote(s)`}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 7,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 15,
                  maxWidth: '100%',
                  height: barHeight,
                  borderRadius: 999,
                  background: `hsl(${hue} 78% 56%)`,
                  transition: 'height 220ms ease',
                }}
              />
              <span
                style={{
                  color: theme.colors.textWhiteMuted,
                  fontSize: theme.fontSizes.smallestFontSize,
                  lineHeight: 1,
                }}
              >
                {index + 1}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
