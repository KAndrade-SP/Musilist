import styled from 'styled-components'

export const SettingsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

export const SettingsContent = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem 2rem;
`

export const SettingsSectionTitle = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

export const Tab = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SettingsDropdownIcon = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`

export const SettingsDropdown = styled.div`
  ${({ theme: { colors, breakpoints } }) => `
    width: 100%;
    background-color: ${colors.darkBackground};
    padding: 0 0 1rem;
    display: none;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: ${breakpoints.sm}) {
      display: flex;
    }
  `}
`

export const SettingsDropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ className, theme }) => (className ? theme.colors.darkPurple : theme.colors.darkBackground)};
  padding: 0.5rem 2rem;
  color: ${({ className, theme }) => (className ? theme.colors.lightPurple : theme.colors.textWhite)};
`

export const UploadContent = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: ${breakpoints.sm}) {
      flex-direction: row;
    }
  `}
`

export const PhotoPreview = styled.img`
  ${({ theme: { breakpoints } }) => `
    width: 200px;
    height: 200px;
    object-fit: cover;

    @media (max-width: ${breakpoints.sm}) {
      width: 150px;
      height: 150px;
    }
  `}
`

export const BannerPreview = styled.img`
  ${({ theme: { breakpoints } }) => `
    width: 500px;
    height: 200px;
    object-fit: cover;

    @media (max-width: ${breakpoints.sm}) {
      width: 300px;
      height: 150px;
    }

    @media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.lg}) {
      width: 350px;
    }
  `}
`
