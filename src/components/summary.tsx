import { Box, Icon, Skeleton, Text } from '@chakra-ui/react'
import { CheckFat, X } from '@phosphor-icons/react'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'

export function Summary() {
  const { elements, loading } = useContext(AddElementContext)
  const concludedTasks = elements.filter(({ isFinished }) => isFinished)

  return (
    <Box
      display="flex"
      margin="-3.5rem 0 3rem"
      marginLeft={{ base: '8px', sm: '0' }}
      gap={{ base: '1rem', lg: '2rem' }}
      justifyContent={{ base: 'flex-start', sm: 'center', lg: 'center' }}
      overflow="auto"
    >
      <Box
        minW={{ base: '16rem', lg: '18rem' }}
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        padding="1.5rem 1rem"
        bg="muted"
        borderRadius="6px"
        h="7.5rem"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text>Atividades concluídas</Text>
          <Icon as={CheckFat} fontSize={22} color="sucess" />
        </Box>
        {loading ? (
          <Skeleton
            h="1.5rem"
            w="3rem"
            startColor="skeleton"
            endColor="skeletonFr"
          />
        ) : (
          <Text fontSize="2rem" fontWeight="bold">
            {concludedTasks.length}
          </Text>
        )}
      </Box>

      <Box
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        padding="1.5rem 1rem"
        bg="muted"
        minW={{ base: '16rem', lg: '18rem' }}
        borderRadius="6px"
        h="7.5rem"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text>Atividades não feitas </Text>
          <Icon as={X} fontSize={22} color="destructive" />
        </Box>
        {loading ? (
          <Skeleton
            h="1.5rem"
            w="3rem"
            startColor="skeleton"
            endColor="skeletonFr"
          />
        ) : (
          <Text fontSize="2rem" fontWeight="bold">
            {elements.length - concludedTasks.length}
          </Text>
        )}
      </Box>
    </Box>
  )
}
