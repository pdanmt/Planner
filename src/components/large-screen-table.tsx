import { Box, Table, Tbody, Tr, Td, Icon } from '@chakra-ui/react'
import { X, CheckFat, Trash } from '@phosphor-icons/react'
import { ContentModal } from './content-modal'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/add-element-context'

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
            }) => (
              <Tr
                borderTop="10px solid #202024"
                wordBreak="break-all"
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
                <Td minW={{ base: '20rem', lg: '100%' }}>{selectedSubject}</Td>
                <Td minW={{ base: '20rem', lg: '100%' }}>{addActivities}</Td>
                <Td minW="10%">
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
                <Td minW="10%">
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
                <Td>
                  <ContentModal
                    task={addActivities}
                    contentTask={contentTask}
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
