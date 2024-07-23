import { Box, Icon, Text } from '@chakra-ui/react'
import { CheckFat, X } from '@phosphor-icons/react'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/add-element-context'

export function Summary() {
  const { elements } = useContext(AddElementContext)
  const concludedTasks = elements.filter(({ isFinished }) => isFinished)

  return (
    <Box
      display="flex"
      margin="-3.5rem 0 3rem"
      gap={{ base: '1rem', lg: '2rem' }}
      justifyContent={{ base: 'flex-start', sm: 'center', lg: 'center' }}
      overflow="auto"
    >
      <Box
        minW="17rem"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        padding="1.5rem 1rem"
        bg="gray5"
        borderRadius="6px"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text>Atividades concluídas</Text>
          <Icon as={CheckFat} fontSize={22} color="green1" />
        </Box>
        <Text fontSize="2rem" fontWeight="bold">
          {concludedTasks.length}
        </Text>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        padding="1.5rem 1rem"
        bg="gray5"
        minW="17rem"
        borderRadius="6px"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text>Atividades não feitas </Text>
          <Icon as={X} fontSize={22} color="red1" />
        </Box>
        <Text fontSize="2rem" fontWeight="bold">
          {elements.length - concludedTasks.length}
        </Text>
      </Box>
    </Box>
  )
}
