import { Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <Box
      bg="bg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      minH="100vh"
    >
      <Text fontSize="1.3rem">
        A página que você está tentando acessar não foi encontrada
      </Text>
      <Text color="mutedFr">Erro: página não encontrada</Text>
      <Text
        color="sucess"
        opacity="0.85"
        cursor="pointer"
        as={Link}
        to="/"
        _hover={{ transition: '0.2s', color: 'sucess1' }}
      >
        Voltar para a página inicial
      </Text>
    </Box>
  )
}
