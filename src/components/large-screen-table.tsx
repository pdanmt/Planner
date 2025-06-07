import { Box, Table, Tbody, Tr, Td, Icon, Text } from '@chakra-ui/react'
import { X, CheckFat } from '@phosphor-icons/react'
import { ContentModal } from './content-modal'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'
import { DeleteElementConfirmModal } from './delete-element-confirm-modal'

export function LargeScreenTable() {
  const { elements, dispatchMarkElementAsFinished, subjects, highContrast } =
    useContext(AddElementContext)

  return (
    <Box
      p="2rem 0"
      display={{ base: 'none', lg: 'block' }}
      w="70%"
      margin="0 auto"
    >
      {subjects.map(([subject, color]) => {
        return (
          <Box key={subject}>
            {elements
              .map(({ selectedSubject }) => selectedSubject)
              .includes(subject) && (
              <Text
                fontSize="1.5rem"
                fontWeight="700"
                pt="2rem"
                display={{ base: 'none', lg: 'flex' }}
              >
                {subject}
              </Text>
            )}
            {elements.map(
              ({
                addActivities,
                selectedSubject,
                id,
                isFinished,
                contentTask,
                createdAt,
              }) => {
                if (selectedSubject === subject) {
                  return (
                    <Table borderRadius="8px" variant="unstyled" key={id}>
                      <Tbody>
                        <Tr
                          borderTop="10px solid"
                          borderColor="primaryFr"
                          textDecor={isFinished ? 'line-through' : 'none'}
                          bg={
                            isFinished
                              ? '#a5eea0'
                              : highContrast
                                ? 'muted'
                                : color
                          }
                          opacity={isFinished ? '0.6' : '1'}
                        >
                          <Td minW="20rem">{addActivities}</Td>
                          <Td minW="20rem">
                            {contentTask.slice(0, 30).concat('...')}
                          </Td>
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
                                onClick={() =>
                                  dispatchMarkElementAsFinished(id)
                                }
                              />
                            ) : (
                              <Icon
                                as={CheckFat}
                                _hover={{
                                  color: 'green1',
                                }}
                                fontSize={20}
                                cursor="pointer"
                                onClick={() =>
                                  dispatchMarkElementAsFinished(id)
                                }
                              />
                            )}
                          </Td>
                          <Td minW="1rem">
                            <DeleteElementConfirmModal id={id} />
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
                      </Tbody>
                    </Table>
                  )
                }

                return null
              },
            )}
          </Box>
        )
      })}
    </Box>
  )
}
