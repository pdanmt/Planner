import { MenuItem } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface MenuItemComponentProps {
  color?: string
  fn: () => void
  children: ReactNode
}

export function MenuItemComponent({
  color,
  fn,
  children,
}: MenuItemComponentProps) {
  return (
    <MenuItem
      bg="primary"
      border="2px solid transparent"
      borderRadius="6px"
      _hover={{ border: '2px solid', borderColor: 'gray2' }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      color={color}
      onClick={() => fn()}
    >
      {children}
    </MenuItem>
  )
}
