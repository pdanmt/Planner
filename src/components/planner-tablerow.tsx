import { Tr, Td, Icon, useDisclosure } from '@chakra-ui/react'
import { CheckFat, MagnifyingGlass, Trash, X } from '@phosphor-icons/react'
import { options } from '../pages/form-add-in-planner'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/add-element-context'
import { ContentModal } from './content-modal'

interface PlannerTablerowProps {
  activitie: string
  selectedSubject: string
  id: number
  isFinished?: boolean
}

export function PlannerTablerow({
  activitie,
  selectedSubject,
  id,
  isFinished,
}: PlannerTablerowProps) {
  const { dispatchRemoveElement, dispatchMarkElementAsFinished } =
    useContext(AddElementContext)

  const { onOpen } = useDisclosure()

  function color(color: string) {
    switch (color) {
      case 'Matemática':
        return '#3366cc'
      case 'Português':
        return '#FF6600'
      case 'Física':
        return '#FFCC00'
      case 'Biologia':
        return '#33CC33'
      case 'Geografia':
        return '#669933'
      case 'Química':
        return '#CC3333'
      case 'História':
        return '#993399'
      case 'Sociologia':
        return '#FF99CC'
      case 'Ed.Física':
        return '#66CCCC'
      case 'Espanhol':
        return '#FF3366'
      case 'Eletricidade':
        return '#FFAE69'
      case 'Eletrônica Digital':
        return '#666699'
      case 'Desenho':
        return '#CC6600'
      case 'Informática':
        return '#999999'

      default:
        return '#29292e'
    }
  }

  // const colors = {
  //   matematica: '#3366CC',
  //   portugues: '#FF6600',
  //   fisica: '#FFCC00',
  //   biologia: '#33CC33',
  //   geografia: '#669933',
  //   quimica: '#CC3333',
  //   historia: '#993399',
  //   sociologia: '#FF99CC',
  //   edfisica: '#66CCCC',
  //   espanhol: '#FF3366',
  //   eletricidade: '#FFAE69',
  //   eletronica_digital: '#666699',
  //   desenho: '#CC6600',
  //   informatica: '#999999',
  // }

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
          background: isFinished ? '#a5eea0' : color(selectedSubject),
          // background: isFinished
          //   ? '#a5eea0'
          //   : colors[
          //       selectedSubject
          //         .toLowerCase()
          //         .normalize('NFD')
          //         .replace(/\p{Mn}/gu, '')
          //         .replace(/\s+/g, '_')
          //     ],
          opacity: isFinished ? '0.6' : '1',
        }}
      >
        <Td w="40%">{selectedSubject}</Td>
        <Td w="40%">{activitie}</Td>
        <Td w="10%">
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
        <Td w="10%">
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
          <Icon
            _hover={{ transition: '0.3s', background: '#121214' }}
            as={MagnifyingGlass}
            border="1px solid #121214"
            borderRadius="6px"
            p="1rem"
            cursor="pointer"
            fontSize={22}
            onClick={onOpen}
          />
        </Td>
        <ContentModal onOpen={onOpen} />
      </Tr>
    )
  }
}
