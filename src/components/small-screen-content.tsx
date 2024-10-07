import { Box, Icon, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'
import { CheckFat, X } from '@phosphor-icons/react'
import { ContentModal } from './content-modal'
import { options } from './add-element'
import { DeleteElementConfirmModal } from './delete-element-confirm-modal'

export function SmallScreenContent() {
  const { elements, dispatchMarkElementAsFinished, HighContrast } =
    useContext(AddElementContext)

  return (
    <>
      {options.map(({ label, value }) => {
        return (
          <Box key={value} display="flex" flexDir="column" gap="1rem">
            {elements
              .map(({ selectedSubject }) => selectedSubject)
              .includes(label) && (
              <Text
                fontSize="1.5rem"
                fontWeight="700"
                pl="0.5rem"
                pt="1rem"
                display={{ base: 'flex', lg: 'none' }}
              >
                {label}
              </Text>
            )}
            {elements.map(
              ({
                id,
                addActivities,
                selectedSubject,
                isFinished,
                contentTask,
                createdAt,
              }) => {
                if (selectedSubject === label) {
                  return (
                    <Box
                      key={id}
                      display={{ base: 'flex', lg: 'none' }}
                      flexDir="column"
                      gap="1rem"
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
                      w="95vw"
                      margin="0 auto"
                      borderRadius="6px"
                      p="1rem"
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="1.175rem">{addActivities}</Text>
                        <Box display="flex" alignItems="center" gap="1rem">
                          <ContentModal
                            contentTask={contentTask}
                            task={addActivities}
                            selectedSubject={selectedSubject}
                            createdAt={createdAt}
                            id={id}
                          />
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
                          <DeleteElementConfirmModal id={id} />
                        </Box>
                      </Box>
                      <Text>
                        {contentTask.length >= 33
                          ? contentTask.substring(0, 33).concat('...')
                          : contentTask}
                      </Text>
                    </Box>
                  )
                }

                return null
              },
            )}
          </Box>
        )
      })}
    </>
  )
}
