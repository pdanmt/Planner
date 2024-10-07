import { Box, Button, Img, Text } from '@chakra-ui/react'
import GoogleLogo from '../../public/google_logo.png'
import { handleLogin } from '../firebase-config'

export function LoginPage() {
  return (
    <Box
      display="flex"
      flexDir="column"
      gap="1rem"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
    >
      <Text fontSize="1.3rem">Faça login na sua conta para continuar.</Text>
      <Button
        display="flex"
        alignItems="center"
        gap="0.5rem"
        bg="#f1f1f1"
        onClick={() => handleLogin()}
      >
        <Text>Login com</Text>
        <Img w="1.5rem" h="1.5rem" src={GoogleLogo} />
      </Button>
    </Box>
  )
}
