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
  useDisclosure,
} from '@chakra-ui/react'

import { MagnifyingGlass } from '@phosphor-icons/react'

interface ContentModalProps {
  task: string
  contentTask: string
  selectedSubject: string
  createdAt: string
}

export function ContentModal({
  task,
  contentTask,
  selectedSubject,
  createdAt,
}: ContentModalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Icon
        as={MagnifyingGlass}
        onClick={onOpen}
        color="#fff"
        borderRadius="6px"
        _hover={{ color: 'primary' }}
        fontSize={22}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay background="#00000099" />
        <ModalContent background="primary" boxShadow="0 0 100px #28282b">
          <ModalHeader color="gray1">
            <Box>
              <Text>
                {selectedSubject} - {task}
              </Text>
              <Text fontSize="0.9rem" fontWeight="400" color="gray3">
                Criado em: {createdAt}
              </Text>
            </Box>
          </ModalHeader>
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
