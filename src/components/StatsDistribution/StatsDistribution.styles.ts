import styled from 'styled-components'

export const COLORS = {
  completed: 'statusCompleted',
  planning: 'statusPlanning',
  dropped: 'statusDropped',
} as const

export const Container = styled.section`
  ${({ theme: { colors, fontSizes } }) => `
    width: 100%;
    height: 100%;
    min-width: 0;
    border-radius: 10px;
    border: 1px solid ${colors.grayBackground};
    background: linear-gradient(160deg, ${colors.darkPurpleOp} 0%, ${colors.darkBackgroundStrong} 100%);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    color: ${colors.textWhite};

    h4 {
      margin: 2px 0 0;
      font-size: ${fontSizes.bigFontSize};
      color: ${colors.textWhite};
      line-height: 1.1;
      font-weight: 700;
      text-align: center;
    }
  `}
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

export const StatusCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
  text-align: center;
`

export const Pill = styled.div<{ bg: string }>`
  background: ${({ theme, bg }) => theme.colors[bg as keyof typeof theme.colors]};
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
  font-weight: 700;
  line-height: 1;
  padding: 6px 12px;
`

export const CountText = styled.div`
  color: ${({ theme }) => theme.colors.textWhiteMuted};
  font-size: ${({ theme }) => theme.fontSizes.smallestFontSize};
  line-height: 1;

  strong {
    color: ${({ theme }) => theme.colors.textWhite};
    font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
    margin-right: 4px;
    font-weight: 700;
  }
`

export const PercentText = styled.div`
  color: ${({ theme }) => theme.colors.lightPurple};
  font-size: ${({ theme }) => theme.fontSizes.smallestFontSize};
  font-weight: 700;
  line-height: 1;
`

export const ProgressBarWrapper = styled.div`
  ${({ theme: { colors } }) => `
    width: 100%;
    height: 9px;
    margin-top: 2px;
    border-radius: 999px;
    overflow: hidden;
    display: flex;
    background: ${colors.grayBackground};
  `}
`

export const Segment = styled.div<{ width: string; color: string }>`
  height: 100%;
  width: ${({ width }) => width};
  background: ${({ theme, color }) => theme.colors[color as keyof typeof theme.colors]};
  transition: width 220ms ease;
`

export const FooterText = styled.p`
  margin: 2px 0 0;
  color: ${({ theme }) => theme.colors.textWhiteMuted};
  font-size: ${({ theme }) => theme.fontSizes.smallestFontSize};
  line-height: 1;
  text-align: center;
`


