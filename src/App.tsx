import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './router'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { DarkTheme } from './themes/dark-theme'
import { LightTheme } from './themes/light-theme'
import { AddElementContextProvider } from './contexts/element-context'
import { Toaster } from 'sonner'
import { UserContextProvider } from './contexts/user-context'
import { ThemeContext } from './contexts/theme-context'

export function App() {
  const { theme } = ThemeContext()

  return (
    <ChakraProvider theme={theme ? DarkTheme : LightTheme}>
      <Toaster richColors />
      <UserContextProvider>
        <AddElementContextProvider>
          <Box
            boxSizing="border-box"
            margin="0"
            padding="0"
            bg="primaryFr"
            minH="100vh"
            color="fr"
            fontFamily="Roboto, monospace"
          >
            <RouterProvider router={AppRoutes} />
          </Box>
        </AddElementContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  )
}
