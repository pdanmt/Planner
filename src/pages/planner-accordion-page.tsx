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
import { AddElementContext } from '../contexts/add-element-context'
import { options } from './form-add-in-planner'
import { ContentModal } from '../components/content-modal'

export function Planner() {
  const { elements } = useContext(AddElementContext)

  return (
    <Accordion
      w={{ base: '100%', md: '95%', lg: '90%' }}
      paddingTop="7rem"
      allowMultiple
      margin="0 auto"
    >
      {options.map(({ label, value }) => (
        <AccordionItem key={value} p="0.65rem 0">
          <h1>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h1>
          <AccordionPanel>
            <Box background="gray6" borderRadius="8px" p="1rem">
              {elements.map(
                ({
                  addActivities,
                  id,
                  selectedSubject,
                  isFinished,
                  contentTask,
                }) => {
                  if (selectedSubject === label) {
                    return (
                      <Box
                        key={id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          wordBreak="break-all"
                          style={{
                            textDecoration: isFinished
                              ? 'line-through'
                              : 'none',
                          }}
                        >
                          <strong>Tarefa:</strong> {addActivities}
                        </Text>
                        <ContentModal
                          contentTask={contentTask}
                          task={addActivities}
                        />
                      </Box>
                    )
                  }
                  return ''
                },
              )}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
