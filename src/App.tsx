import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './router'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { DarkTheme } from './themes/dark-theme'
import { AddElementContextProvider } from './contexts/add-element-context'

export function App() {
  return (
    <ChakraProvider theme={DarkTheme}>
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
    </ChakraProvider>
  )
}
