import { Tooltip } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ToolTipComponentProps {
  children: ReactNode
  label: string
}

export function ToolTipComponent({ children, label }: ToolTipComponentProps) {
  return (
    <Tooltip
      label={label}
      hasArrow
      placement="bottom"
      padding="0.5rem 1rem"
      borderRadius="6px"
      bg="secondary"
      marginTop="0.8rem"
    >
      {children}
    </Tooltip>
  )
}
