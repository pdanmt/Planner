import { Box } from '@chakra-ui/react'
import { AddElement } from '../components/add-element'
import { EverythingOnPlanner } from './planner-page'
import { Loading } from '../components/loading'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'

export function Home() {
  const { loading } = useContext(AddElementContext)

  if (loading) {
    return <Loading />
  }

  return (
    <Box>
      <AddElement />
      <EverythingOnPlanner />
    </Box>
  )
}
