import {
  Box,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { MagnifyingGlass } from '@phosphor-icons/react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddElementContext } from '../contexts/element-context'
import { toast } from 'sonner'

interface ContentModalProps {
  task: string
  contentTask: string
  selectedSubject: string
  createdAt: string
  id: string
}

export function ContentModal({
  task,
  contentTask,
  selectedSubject,
  createdAt,
  id,
}: ContentModalProps) {
  const { dispatchChangeElement } = useContext(AddElementContext)

  const { isOpen, onClose, onOpen } = useDisclosure()

  const contentSchema = z.object({
    contentTaskArea: z.string(),
    id: z.string().default(id),
  })
  type contentType = z.infer<typeof contentSchema>
  const { handleSubmit, register } = useForm<contentType>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      contentTaskArea: contentTask,
    },
  })

  function handleChangeContentTask({ contentTaskArea, id }: contentType) {
    try {
      dispatchChangeElement({ contentTaskArea, id })
      toast.success('Atividade editada!')
    } catch {
      toast.error('Algo deu errado. Tente novamente!')
    }
  }

  return (
    <>
      <Icon
        as={MagnifyingGlass}
        onClick={onOpen}
        color="fr"
        borderRadius="6px"
        _hover={{ color: 'mutedFr' }}
        fontSize={22}
        cursor="pointer"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay background="#00000099" />
        <ModalContent background="primaryFr" boxShadow="0 0 100px #28282b">
          <ModalHeader color="ring">
            <Box maxW="93%">
              <Text>
                {selectedSubject} - {task}
              </Text>
              <Text fontSize="0.9rem" fontWeight="400" color="gray3">
                Criado em: {createdAt}
              </Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton color="fr" position="absolute" top="1rem" />
          <form onSubmit={handleSubmit(handleChangeContentTask)}>
            <ModalBody color="mutedFr">
              <Textarea
                variant="ghost"
                bg="transparent"
                border="2px solid"
                borderColor="border"
                _focus={{ borderColor: 'fr' }}
                {...register('contentTaskArea')}
              />
            </ModalBody>
            <ModalFooter display="flex" gap="1rem">
              <Button
                type="button"
                onClick={onClose}
                bg="secondary"
                color="fr"
                _hover={{ bg: 'skeletonFr' }}
              >
                Fechar
              </Button>
              <Button
                type="submit"
                bg="green1"
                color="fr"
                _hover={{ bg: 'green2' }}
              >
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
