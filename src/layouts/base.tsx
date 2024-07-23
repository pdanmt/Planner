import { Box } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Outlet } from 'react-router-dom'
import { Summary } from '../components/summary'

export function PageBase() {
  return (
    <Box>
      <Header />
      <Summary />
      <Box>
        <Outlet />
      </Box>
    </Box>
  )
}
