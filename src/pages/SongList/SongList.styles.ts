import { styled } from 'styled-components'
import { IconMessageCircleFilled } from '@tabler/icons-react'

export const SongListSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-bottom: 2rem;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xmd}) {
    display: flex;
    flex-direction: column;
    margin-top: 0;
  }
`

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
`

export const FiltersMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const DropdownFilter = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.xmd}) {
    display: flex;
  }
`

export const FiltersDivisor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FilterTitle = styled.h3`
  ${({ theme: { colors, fontSizes } }) => `
    color: ${colors.lightPurple};
    font-size: ${fontSizes.normalFontSize};
    font-weight: 400;
  `}
`

export const FilterSearch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`

export const FilterList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  margin-top: 1.25rem;
`

export const FilterListItem = styled.li`
  ${({ theme: { fontSizes, colors } }) => `
    font-size: ${fontSizes.normalFontSize};
    color: ${colors.textWhite};
    cursor: pointer;
    padding: 0.25rem 0.50rem;
    border-radius: 8px;
  `}
`

export const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xmd}) {
    margin-top: -0.5rem;
  }
`

export const ListTitle = styled.h2`
  ${({ theme: { colors, fontSizes } }) => `
    color: ${colors.lightPurple};
    font-size: ${fontSizes.bigFontSize};
    font-weight: 400;
  `}
`

export const ListDivisor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const ListBox = styled.div`
  ${({ theme: { colors, breakpoints, fontSizes } }) => `
    display: grid;
    grid-template-columns: 1fr 100px 80px;
    border-radius: 8px;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    background-color: ${colors.darkPurple};
    font-size: ${fontSizes.normalFontSize};
    margin-bottom: 1.5rem;

    @media (max-width: ${breakpoints.md}) {
      font-size: ${fontSizes.smallFontSize};
    }

    @media (max-width: ${breakpoints.sm}) {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
    }
  `}
`

export const ListHeader = styled.div`
  ${({ theme: { colors, breakpoints } }) => `
    display: contents;
    color: ${colors.textWhite};
    font-weight: bold;

    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }
  `}
`

export const ListEntry = styled.div`
  ${({ theme: { colors, breakpoints } }) => `
    display: contents;
    color: ${colors.textWhite};
    padding: 0.5rem 0;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    @media (max-width: ${breakpoints.sm}) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-radius: 5px;
      padding: 1rem 0;
    }
  `}
`

export const ListImageCell = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: ${breakpoints.sm}) {
      img {
        width: 40px;
        height: 40px;
      }

      span {
        width: 150px;
      }
    }

    @media (max-width: ${breakpoints.mini}) {
      img {
        width: 30px;
        height: 30px;
      }

      span {
        width: 100px;
      }
    }
  `}
`

export const ListTitleDivisor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ListScoreSpan = styled.span`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`

export const ListDataDivisor = styled.div`
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`

export const MessageIcon = styled(IconMessageCircleFilled)`
  ${({ theme: { colors, breakpoints } }) => `
    color: ${colors.textWhite};
    margin-left: auto;
    cursor: pointer;

    @media (max-width: ${breakpoints.md}) {
      width: 16px;
      height: 16px;
    }
  `}
`

export const ReviewIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;

  &:hover .review-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    &:hover .review-tooltip {
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
    }
  }
`

export const ReviewTooltip = styled.div`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    position: absolute;
    bottom: calc(100% + 8px);
    right: 0;
    background-color: ${colors.darkPurple};
    color: ${colors.textWhite};
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    width: 220px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    font-size: ${fontSizes.smallFontSize};
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
    z-index: 20;
    word-break: break-word;

    @media (max-width: ${breakpoints.sm}) {
      top: calc(100% + 8px);
      bottom: auto;
      left: 50%;
      right: auto;
      width: 190px;
      transform: translate(-50%, 10px);
    }
  `}

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 12px;
    border-width: 6px;
    border-style: solid;
    border-color: ${props => props.theme.colors.darkPurple} transparent transparent transparent;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      top: auto;
      bottom: 100%;
      left: 50%;
      right: auto;
      transform: translateX(-50%);
      border-color: transparent transparent ${props => props.theme.colors.darkPurple} transparent;
    }
  }

  &.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      transform: translate(-50%, 0);
    }
  }
`

export const ListCell = styled.span`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }
  `}
`
