import {
  Button,
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { Trash } from '@phosphor-icons/react'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'

interface DeleteElementConfirmModalProps {
  id: string
}

export function DeleteElementConfirmModal({
  id,
}: DeleteElementConfirmModalProps) {
  const { dispatchRemoveElement } = useContext(AddElementContext)
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Icon
        as={Trash}
        _hover={{
          color: 'destructive',
        }}
        fontSize={20}
        cursor="pointer"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="#00000099" />
        <ModalContent bg="primaryFr" boxShadow="0 0 100px #28282b" color="fr">
          <ModalHeader fontSize="1.2rem" textAlign="center">
            Tem certeza que deseja deletar esta atividade?
          </ModalHeader>
          <ModalFooter display="flex" justifyContent="center" gap="1rem">
            <Button
              bg="muted"
              color="mutedFr"
              _hover={{ bg: 'skeletonFr' }}
              w="30%"
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
            <Button
              bg="destructive"
              color="gray1"
              w="30%"
              transition="0.2s"
              _hover={{ filter: 'brightness(0.8)' }}
              onClick={() => dispatchRemoveElement(id)}
            >
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
