import { Box, Tooltip } from '@chakra-ui/react'
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
      placement="top"
      padding="0.5rem 1rem"
      borderRadius="6px"
      bg="primary"
      marginBottom="0.3rem"
    >
      <Box
        p="0 0.5rem 6px"
        color="white"
        borderBottom="2px solid transparent"
        _hover={{
          color: 'green1',
          borderBottom: '2px solid',
          borderColor: 'green1',
        }}
      >
        {children}
      </Box>
    </Tooltip>
  )
}
