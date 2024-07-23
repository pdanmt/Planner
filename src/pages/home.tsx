import { Box } from '@chakra-ui/react'
import { AddElement } from '../components/add-element'
import { EverythingOnPlanner } from './planner-page'

export function AddElementInPlanner() {
  return (
    <Box>
      <AddElement />
      <EverythingOnPlanner />
    </Box>
  )
}
