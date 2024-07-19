import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useLocation, Link } from 'react-router-dom'

interface CustomNavLinkProps {
  to: string
  children: ReactNode
}

export function CustomNavLink({ to, children }: CustomNavLinkProps) {
  const location = useLocation()

  const isActive = location.pathname === to

  return (
    <Link to={to}>
      <Box color={isActive ? 'green.500' : '#fff'}>{children}</Box>
    </Link>
  )
}
