import styled, { createGlobalStyle } from 'styled-components'

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
        background-color: ${({ theme: { colors } }) => colors.darkBackground};
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
`

export const StyledToastContainer = styled.div`
  .Toastify__toast--success {
    background-color: ${({ theme }) => theme.colors.darkPurple};
    color: ${({ theme }) => theme.colors.textWhite};
  }

  .Toastify__toast-icon {
    svg {
      fill: ${({ theme }) => theme.colors.lightPurple};
    }
  }

  .Toastify__progress-bar {
    background-color: ${({ theme }) => theme.colors.lightPurple};
  }
`
