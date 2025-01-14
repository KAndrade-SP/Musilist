import styled from 'styled-components'

export const SearchTitle = styled.span`
  ${({ theme: { fontSizes, colors } }) => `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
      display: inline-block;
      font-size: ${fontSizes.smallestFontSize};
      font-weight: 700;
      color: ${colors.textWhite};
  `}
`
