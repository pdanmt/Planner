import { Box, useTheme } from '@chakra-ui/react'
import { OrbitProgress } from 'react-loading-indicators'

export function Loading() {
  const theme = useTheme()

  return (
    <Box
      w="100%"
      minH="50vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <OrbitProgress color={theme.colors.border} size="small" />
    </Box>
  )
}
