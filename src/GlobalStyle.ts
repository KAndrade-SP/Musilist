import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    #root {
        display: flex;
        flex-direction: column;
    }

    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    *:focus {
        outline: none;
    }

    html {
        scroll-behavior: smooth;
        overflow-x: hidden;
    }

    body {
        font-family: 'Mulish';
        transition: .4s;
        font-size: ${({ theme: { fontSizes } }) => fontSizes.normalFontSize};
        background-color: ${({ theme: { colors } }) => colors.grayBackground};
        color: ${({ theme: { colors } }) => colors.textWhite};
    }

    h1, h2, h3 {
        color: ${({ theme: { colors } }) => colors.textWhite};
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    img {
        max-width: 100%;
        height: auto;
    }
`;
