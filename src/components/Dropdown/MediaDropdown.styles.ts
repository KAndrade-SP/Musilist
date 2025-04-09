import styled from 'styled-components'

export const MediaDropdownContainer = styled.div`
  position: relative;
  width: 200px;
`

export const MediaDropdownHeader = styled.div`
  ${({ theme: { colors, fontSizes } }) => `
    padding: 8px 15px;
    background-color: ${colors.textWhite};
    color: ${colors.grayBackgroundOp};
    font-weight: bold;
    font-size: ${fontSizes.normalFontSize};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: box-shadow 0.3s ease;
  `}

  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const MediaDropdownList = styled.ul`
  ${({ theme: { colors, fontSizes } }) => `
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background-color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    list-style: none;
    padding: 10px 0;
    margin: 0;
    z-index: 1000;
    
    opacity: 0;
    transform: translateY(-10px);
    visibility: hidden;
    pointer-events: none;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 20px;
      border-width: 0 10px 10px 10px;
      border-style: solid;
      border-color: transparent transparent ${colors.textWhite}; transparent;
    }
  `}

  &.open {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
    pointer-events: auto;
  }
`

export const MediaIconButton = styled.button`
  ${({ theme: { colors } }) => `
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: ${colors.grayBackground};
    opacity: 0.7;
  `}
`
