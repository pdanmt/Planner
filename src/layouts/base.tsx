import { Box } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Outlet } from 'react-router-dom'

export function PageBase() {
  return (
    <Box
      minW={{ base: '95vw', md: '80vw', lg: '75vw' }}
      minH="60vh"
      padding={{ base: '1rem', md: '1rem', lg: '1.5rem' }}
      bg="secondary"
      borderRadius="8px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
      position="relative"
    >
      <Header />
      <Outlet />
    </Box>
  )
}
