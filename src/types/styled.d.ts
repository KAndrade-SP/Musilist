import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      purplePrimary: string,
      purpleSecondary: string,
      lightPurple: string,
      darkPurple: string,
      grayBackground: string,
      darkBackground: string,
      textWhite: string
    }
    fontSizes: {
      biggestFontSize: string,
      bigFontSize: string,
      normalFontSize: string,
      smallFontSize: string,
      smallestFontSize: string,
    }
    breakpoints: {
      mini: string,
      sm: string,    
      md: string,
      xmd: string,
      lg: string,
      xl: string,
      xlg: string,
      xlgx: string
    }
  }
}
