import { Box, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { PlannerTablerow } from '../components/planner-tablerow'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/add-element-context'

export function EverythingOnPlanner() {
  const { elements } = useContext(AddElementContext)
  return (
    <Box paddingTop="3.5rem" w={{ base: '100%', md: '80%', lg: '70%' }}>
      <Text fontSize="1.5rem" paddingBottom="1rem">
        Suas tarefas:
      </Text>
      <Box
        overflow="auto"
        maxH="35vh"
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#444',

            '&:hover': {
              transition: '0.2s',
              background: '#333',
            },
          },
          '&::-webkit-scrollbar-track': {
            background: '#999',
          },
        }}
      >
        <Table background="gray6" borderRadius="8px" variant="unstyled">
          <Thead borderBottom="1px solid #121212">
            <Tr>
              <Th>Matéria:</Th>
              <Th>Tarefa:</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody
            style={{
              height: elements.length === 0 ? '14rem' : 'auto',
            }}
          >
            {elements.map(
              ({ addActivities, selectedSubject, id, isFinished }) => (
                <PlannerTablerow
                  key={id}
                  activitie={addActivities}
                  selectedSubject={selectedSubject}
                  id={id}
                  isFinished={isFinished}
                />
              ),
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
