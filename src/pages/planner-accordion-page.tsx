import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'

export function Planner() {
  const { elements } = useContext(AddElementContext)
  const pendingElements = elements.filter(
    ({ isFinished }) => isFinished === false,
  )
  const arrayUniqueSubjects = Array.from(
    new Set(pendingElements.map(({ selectedSubject }) => selectedSubject)),
  )

  return (
    <Box w="90%" margin="0 auto">
      <Box paddingBottom="2rem">
        {pendingElements.length === 0 ? (
          <Text fontSize="1.5rem" paddingBottom="1rem" textAlign="center">
            Nada para fazer...
          </Text>
        ) : (
          <Text fontSize="1.5rem" paddingBottom="1rem">
            Matérias com atividades pendentes:
          </Text>
        )}
        <Accordion allowMultiple>
          {arrayUniqueSubjects.map((_, index) => (
            <AccordionItem key={index} p="0.65rem 0">
              <h1>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {arrayUniqueSubjects[index]}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h1>
              {pendingElements.map(
                ({
                  addActivities,
                  contentTask,
                  id,
                  selectedSubject,
                  createdAt,
                }) => {
                  if (selectedSubject === arrayUniqueSubjects[index]) {
                    return (
                      <AccordionPanel key={id}>
                        <Box p="1rem" bg="gray6" borderRadius="8px">
                          <Text textAlign="justify">
                            <strong>{addActivities}:</strong> {contentTask}
                          </Text>
                          <Text
                            color="gray3"
                            fontSize="0.8rem"
                            paddingTop="1rem"
                          >
                            Criado em: {createdAt}
                          </Text>
                        </Box>
                      </AccordionPanel>
                    )
                  }
                  return ''
                },
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  )
}
