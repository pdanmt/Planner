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
      <Box
        color={isActive ? 'green.500' : '#fff'}
        p="0 0.5rem 6px"
        borderBottom="2px solid transparent"
        _hover={{
          color: 'green1',
          borderBottom: '2px solid',
          borderColor: 'green1',
        }}
      >
        {children}
      </Box>
    </Link>
  )
}
