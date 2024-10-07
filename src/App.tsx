import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './router'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { DarkTheme } from './themes/dark-theme'
import { AddElementContextProvider } from './contexts/element-context'
import { Toaster } from 'sonner'
import { UserContextProvider } from './contexts/user-context'

export function App() {
  return (
    <ChakraProvider theme={DarkTheme}>
      <Toaster richColors />
      <UserContextProvider>
        <AddElementContextProvider>
          <Box
            boxSizing="border-box"
            margin="0"
            padding="0"
            bg="secondary"
            minH="100vh"
            color="white"
            fontFamily="Roboto, monospace"
          >
            <RouterProvider router={AppRoutes} />
          </Box>
        </AddElementContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  )
}
