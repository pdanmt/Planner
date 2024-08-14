import { Box, Table, Tbody, Tr, Td, Icon } from '@chakra-ui/react'
import { X, CheckFat, Trash } from '@phosphor-icons/react'
import { ContentModal } from './content-modal'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'

export function LargeScreenTable() {
  const {
    elements,
    dispatchMarkElementAsFinished,
    dispatchRemoveElement,
    HighContrast,
  } = useContext(AddElementContext)

  return (
    <Box
      paddingTop="2rem"
      display={{ base: 'none', lg: 'block' }}
      w="70%"
      margin="0 auto"
    >
      <Table borderRadius="8px" variant="unstyled">
        <Tbody>
          {elements.map(
            ({
              addActivities,
              selectedSubject,
              id,
              isFinished,
              contentTask,
              createdAt,
            }) => (
              <Tr
                borderTop="10px solid #202024"
                key={id}
                style={{
                  textDecoration: isFinished ? 'line-through' : 'none',
                  background: isFinished
                    ? '#a5eea0'
                    : HighContrast(
                        selectedSubject
                          .toLowerCase()
                          .normalize('NFD')
                          .replace(/\p{Mn}/gu, '')
                          .replace(/\s+/g, '_'),
                      ),
                  opacity: isFinished ? '0.6' : '1',
                }}
              >
                <Td minW="20rem">{selectedSubject}</Td>
                <Td minW="20rem">{addActivities}</Td>
                <Td minW="1rem">
                  {isFinished ? (
                    <Icon
                      as={X}
                      color="red1"
                      _hover={{
                        color: 'red2',
                      }}
                      fontSize={20}
                      cursor="pointer"
                      onClick={() => dispatchMarkElementAsFinished(id)}
                    />
                  ) : (
                    <Icon
                      as={CheckFat}
                      _hover={{
                        color: 'green1',
                      }}
                      fontSize={20}
                      cursor="pointer"
                      onClick={() => dispatchMarkElementAsFinished(id)}
                    />
                  )}
                </Td>
                <Td minW="1rem">
                  <Icon
                    as={Trash}
                    _hover={{
                      color: 'red1',
                    }}
                    fontSize={20}
                    cursor="pointer"
                    onClick={() => dispatchRemoveElement(id)}
                  />
                </Td>
                <Td minW="1rem">
                  <ContentModal
                    task={addActivities}
                    contentTask={contentTask}
                    selectedSubject={selectedSubject}
                    createdAt={createdAt}
                    id={id}
                  />
                </Td>
              </Tr>
            ),
          )}
        </Tbody>
      </Table>
    </Box>
  )
}
