import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { CheckFat, MagnifyingGlass, Plus, Trash } from '@phosphor-icons/react'
import { addSubject } from '../services/acess/userAcess'
import { useUser } from '../contexts/user-context'
import { toast } from 'sonner'

export function AddSubject() {
  const [subject, setSubject] = useState<string>('')
  const [hue, setHue] = useState<number>(180)
  const [saturation, setSaturation] = useState<number>(50)
  const { onClose, onOpen, isOpen } = useDisclosure()
  const { user } = useUser()

  const color = `hsl(${hue}, 100%, ${saturation}%)`

  async function handleAddSubject() {
    try {
      await addSubject(subject, color, user)
      toast.success('Matéria adicionada!')
    } catch (error) {
      toast.error('Algo deu errado ao adicionar a matéria. Tente novamente.')
      console.error(`Algo deu errado ao adicionar a matéria. Erro: ${error}`)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        type="button"
        border="1px solid"
        borderColor="green2"
        color="green1"
        fontWeight="bold"
        boxSizing="content-box"
        _hover={{ background: 'green2', color: '#fff' }}
        onClick={() => onOpen()}
      >
        <Plus size="1.3rem" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="primaryFr"
          color="fr"
          as="form"
          onSubmit={() => handleAddSubject()}
        >
          <ModalCloseButton />
          <ModalHeader>Adicione uma matéria</ModalHeader>

          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Input
              placeholder="Nome da matéria"
              variant="ghost"
              bg="transparent"
              border="1px solid"
              borderColor="border"
              px="0.5rem"
              maxLength={25}
              required
              onChange={(e) => setSubject(e.target.value)}
            />

            {/* color slider */}
            <Slider
              min={0}
              max={360}
              value={hue}
              onChange={(val) => setHue(val)}
              w="100%"
              my="1rem"
            >
              <SliderThumb
                bg={color}
                boxSize={4}
                _focus={{ border: '2px solid', borderColor: 'fr' }}
              />
              <SliderTrack
                h="8px"
                bg="linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)"
              />
            </Slider>

            {/* saturation slider */}
            <Slider
              min={0}
              max={100}
              value={saturation}
              onChange={(val) => setSaturation(val)}
              w="100%"
              mb="1rem"
            >
              <SliderThumb
                bg={color}
                boxSize={4}
                _focus={{ border: '2px solid', borderColor: 'fr' }}
              />
              <SliderTrack
                h="8px"
                bg={`linear-gradient(to right, hsl(${hue}, 100%, 0%), hsl(${hue}, 100%, 50%), hsl(${hue}, 100%, 100%))`}
              />
            </Slider>

            {/* preview in large screen */}
            <Text fontSize="1.5rem" fontWeight="bold" w="100%" pb="0.5rem">
              {subject || 'Matéria'}
            </Text>
            <Flex
              align="center"
              justify="space-between"
              w="100%"
              p="0.85rem 0.5rem"
              bg={color}
              display={{ base: 'none', lg: 'flex' }}
            >
              <Text>Atividade</Text>
              <Text>Conteúdo</Text>
              <Flex gap="1rem" fontSize="1.2rem">
                <CheckFat />
                <Trash />
                <MagnifyingGlass />
              </Flex>
            </Flex>

            {/* preview in small screen */}
            <Flex
              direction="column"
              align="center"
              justify="space-between"
              w="100%"
              h="80px"
              p="0.5rem 0.8rem"
              borderRadius="6px"
              bg={color}
              display={{ base: 'flex', lg: 'none' }}
            >
              <Flex justify="space-between" w="100%" align="center">
                <Text fontSize="1.2rem">Atividade</Text>
                <Flex gap="1rem" fontSize="1.2rem">
                  <MagnifyingGlass />
                  <CheckFat />
                  <Trash />
                </Flex>
              </Flex>
              <Text w="100%">Conteúdo</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="transparent"
              color="green1"
              border="1px solid"
              borderColor="green1"
              type="submit"
              _hover={{ bg: 'green1', color: 'primary' }}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
