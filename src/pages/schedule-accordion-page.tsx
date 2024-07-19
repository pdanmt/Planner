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
import { options } from './form-add-in-schedule'

export function Schedule() {
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
            <Box
              background="gray6"
              borderRadius="8px"
              p="1rem"
              display="flex"
              flexDirection="column"
              gap="1rem"
            >
              {elements.length === 0 ? (
                <Text textAlign="center">Nada para fazer...</Text>
              ) : (
                elements.map(
                  ({ addActivities, id, selectedSubject, isFinished }) => {
                    if (selectedSubject === label) {
                      return (
                        <Text
                          key={id}
                          wordBreak="break-all"
                          style={{
                            textDecoration: isFinished
                              ? 'line-through'
                              : 'none',
                          }}
                        >
                          <strong>Tarefa:</strong> {addActivities}
                        </Text>
                      )
                    }
                    return ''
                  },
                )
              )}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
