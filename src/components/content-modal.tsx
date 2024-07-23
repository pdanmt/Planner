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

import { MagnifyingGlass } from '@phosphor-icons/react'

interface ContentModalProps {
  task: string
  contentTask: string
}

export function ContentModal({ task, contentTask }: ContentModalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        color="#fff"
        _hover={{ background: 'gray2', color: 'primary' }}
        p={0}
      >
        <MagnifyingGlass size={22} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay background="#00000099" />
        <ModalContent background="primary" boxShadow="0 0 100px #28282b">
          <ModalHeader color="gray1">{task}</ModalHeader>
          <ModalCloseButton color="#fff" position="absolute" top="1rem" />
          <ModalBody color="gray1">{contentTask}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
