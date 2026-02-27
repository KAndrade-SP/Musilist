import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      purplePrimary: string
      purpleSecondary: string
      lightPurple: string
      darkPurple: string
      darkPurpleOp: string
      grayBackground: string
      grayBackgroundOp: string
      darkBackground: string
      darkBackgroundStrong: string
      textWhite: string
      textWhiteMuted: string
      magentaRed: string
      statusCompleted: string
      statusPlanning: string
      statusDropped: string
      chartGrid: string
      chartAxis: string
      chartCursor: string
    }
    fontSizes: {
      largestFontSize: string
      biggestFontSize: string
      bigFontSize: string
      normalFontSize: string
      smallFontSize: string
      smallestFontSize: string
    }
    breakpoints: {
      mini: string
      sm: string
      xsm: string
      md: string
      xmd: string
      lg: string
      xl: string
      xlg: string
      xlgx: string
    }
  }
}
