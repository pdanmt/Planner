import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './router'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { DefaultTheme } from './themes/default'
import { AddElementContextProvider } from './contexts/add-element-context'

export function App() {
  return (
    <ChakraProvider theme={DefaultTheme}>
      <AddElementContextProvider>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSizing="border-box"
          margin="0"
          padding="0"
          bg="primary"
          minH="100vh"
          color="white"
          fontFamily="Roboto, monospace"
          p="2rem"
        >
          <RouterProvider router={AppRoutes} />
        </Box>
      </AddElementContextProvider>
    </ChakraProvider>
  )
}
