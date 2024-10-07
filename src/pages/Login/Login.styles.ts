import styled from 'styled-components'

export const ContainerLogin = styled.div`
    ${({ theme: { colors } }) => `
        display: flex;
        height: 100vh;
        background-color: ${colors.grayBackground}; 
    `}
`;

export const LeftImage = styled.img`
    ${({ theme: { breakpoints } }) => `
        width: 50%;
        height: 100vh;
        object-fit: cover;
        
        @media (max-width: ${breakpoints.md}) {
            display: none;
        }
    `}
`;

export const RightPanel = styled.div`
    ${({ theme: { colors, breakpoints } }) => `
        color: ${colors.textWhite}; 
        width: 50%;
        background-color: ${colors.darkBackground};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
        
        @media (max-width: ${breakpoints.md}) {
            width: 100%;
        }
    `}
`;

export const Title = styled.h1`
    ${({ theme: { colors, fontSizes } }) => `
        color: ${colors.textWhite}; 
        font-size: ${fontSizes.biggestFontSize};
        margin-bottom: 20px;
        text-align: center;
    `}
`;

export const Description = styled.p`
    ${({ theme: { colors, fontSizes } }) => `
        color: ${colors.textWhite}; 
        font-size: ${fontSizes.bigFontSize};
        margin-bottom: 40px;
        text-align: center;
    `}
`;

export const GoogleButton = styled.button`
    ${({ theme: { colors, fontSizes } }) => `
        display: flex;
        align-items: center;
        color: ${colors.textWhite};
        background: transparent;
        padding: 12px 24px;
        border: 2px solid transparent;
        border-radius: 5px;
        font-size: ${fontSizes.smallFontSize};
        cursor: pointer;
        background-image: linear-gradient(135deg, #7020C0, #5A0EA0);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        transition: transform 0.2s ease, background 0.2s ease;
  
        &:hover {
            transform: scale(1.05); 
            background-image: linear-gradient(135deg, #5A0EA0, #7020C0);
        }
    `}
`;
