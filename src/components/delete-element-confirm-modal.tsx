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
  id: number
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
          color: 'red1',
        }}
        fontSize={20}
        cursor="pointer"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="#00000099" />
        <ModalContent bg="primary" boxShadow="0 0 100px #28282b" color="gray1">
          <ModalHeader fontSize="1.2rem" textAlign="center">
            Tem certeza que deseja deletar esta atividade?
          </ModalHeader>
          <ModalFooter display="flex" justifyContent="center" gap="1rem">
            <Button bg="gray5" color="gray1" _hover={{ bg: 'gray6' }}>
              Cancelar
            </Button>
            <Button
              bg="red1"
              color="gray1"
              _hover={{ bg: 'red2' }}
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
