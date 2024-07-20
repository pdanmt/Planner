import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

interface ContentModalProps {
  task: string
  contentTask: string
}

export function ContentModal({ task, contentTask }: ContentModalProps) {
  const { isOpen, onClose } = useDisclosure()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{task}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{contentTask}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
