import { Box } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Outlet } from 'react-router-dom'

export function PageBase() {
  return (
    <Box
      w="80vw"
      minH="60vh"
      padding="1.5rem"
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
