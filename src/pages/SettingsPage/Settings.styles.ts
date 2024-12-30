import styled from 'styled-components'

export const SettingsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

export const SettingsContent = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`

export const Tab = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
`

export const TabItem = styled.button`
  all: unset;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
  padding: 2rem 0 1rem;
  color: ${({ className, theme }) => (className ? theme.colors.lightPurple : theme.colors.textWhite)};
  border-bottom: ${({ className, theme }) => (className ? `2px solid ${theme.colors.darkPurple}` : 'none')};
  position: relative;
  z-index: 1;
  margin-bottom: -2.15rem;

  ${({ theme: { colors } }) => `
    &:hover {
      color: ${colors.lightPurple}
    }
  `}
`

export const Divider = styled.div`
  height: 2px;
  margin: 0 0 2rem;
  background-color: rgba(234, 234, 240, 0.4);
  position: relative;
  z-index: 0;
`

export const TabContent = styled.div`
  width: 100%;
`
