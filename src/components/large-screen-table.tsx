import { Box, Table, Tbody, Tr, Td, Icon, Text } from '@chakra-ui/react'
import { X, CheckFat } from '@phosphor-icons/react'
import { ContentModal } from './content-modal'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'
import { options } from './add-element'
import { DeleteElementConfirmModal } from './delete-element-confirm-modal'

export function LargeScreenTable() {
  const { elements, dispatchMarkElementAsFinished, HighContrast } =
    useContext(AddElementContext)

  return (
    <Box
      paddingTop="2rem"
      display={{ base: 'none', lg: 'block' }}
      w="70%"
      margin="0 auto"
    >
      {options.map(({ label, value }) => {
        return (
          <Box key={value}>
            {elements
              .map(({ selectedSubject }) => selectedSubject)
              .includes(label) && (
              <Text
                fontSize="1.5rem"
                fontWeight="700"
                pt="2rem"
                display={{ base: 'none', lg: 'flex' }}
              >
                {label}
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
                if (selectedSubject === label) {
                  return (
                    <Table borderRadius="8px" variant="unstyled" key={id}>
                      <Tbody>
                        <Tr
                          borderTop="10px solid #202024"
                          style={{
                            textDecoration: isFinished
                              ? 'line-through'
                              : 'none',
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
