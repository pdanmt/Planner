import { extendTheme } from '@chakra-ui/react'

export const DarkTheme = extendTheme({
  styles: {
    global: {
      '::-webkit-scrollbar-track': {
        background: '#313138',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        background: '#8d8d99',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#8d8d99',
        borderRadius: '10px',
      },
    },
  },
  colors: {
    primary: '#121214',
    secondary: '#202024',
    white: '#fff',

    red1: '#f03847',
    red2: '#7A1921',

    green1: '#00b37e',
    green2: '#00875f',
    green3: '#015f43',

    gray1: '#e1e1e6',
    gray2: '#c4c4cc',
    gray3: '#8d8d99',
    gray4: '#7c7c8a',
    gray5: '#313138',
    gray6: '#29292e',

    yellow: '#fba94c',
  },
  breakpoints: {
    sm: '540px',
  },
})
