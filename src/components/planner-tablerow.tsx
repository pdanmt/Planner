import { Tr, Td, Icon } from '@chakra-ui/react'
import { CheckFat, Trash, X } from '@phosphor-icons/react'
import { options } from '../pages/form-add-in-planner'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/add-element-context'
import { ContentModal } from './content-modal'

interface PlannerTablerowProps {
  activitie: string
  selectedSubject: string
  id: number
  isFinished?: boolean
  contentTask: string
}

export function PlannerTablerow({
  activitie,
  selectedSubject,
  id,
  isFinished,
  contentTask,
}: PlannerTablerowProps) {
  const { dispatchRemoveElement, dispatchMarkElementAsFinished } =
    useContext(AddElementContext)

  const colors = {
    matematica: '#3366CC',
    portugues: '#FF6600',
    fisica: '#FFCC00',
    biologia: '#33CC33',
    geografia: '#669933',
    quimica: '#CC3333',
    historia: '#993399',
    sociologia: '#FF99CC',
    edfisica: '#66CCCC',
    espanhol: '#FF3366',
    eletricidade: '#FFAE69',
    eletronica_digital: '#666699',
    desenho: '#CC6600',
    informatica: '#999999',
  }

  if (
    selectedSubject ===
    options.find(({ label }) => label === selectedSubject)?.label
  ) {
    return (
      <Tr
        borderTop="1px solid #121212"
        wordBreak="break-all"
        style={{
          textDecoration: isFinished ? 'line-through' : 'none',
          background: isFinished
            ? '#a5eea0'
            : colors[
                selectedSubject
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/\p{Mn}/gu, '')
                  .replace(/\s+/g, '_') as keyof typeof colors
              ],
          opacity: isFinished ? '0.6' : '1',
        }}
      >
        <Td minW={{ base: '20rem', md: '20rem', lg: '100%' }}>
          {selectedSubject}
        </Td>
        <Td minW={{ base: '20rem', md: '20rem', lg: '100%' }}>{activitie}</Td>
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
          <ContentModal task={activitie} contentTask={contentTask} />
        </Td>
      </Tr>
    )
  }
}
