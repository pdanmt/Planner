import { Box, Text } from '@chakra-ui/react'
import { Link, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError() as Error

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
        Um erro aconteceu na aplicação. Abaixo você encontra maiis detalhes:
      </Text>
      <Text color="mutedFr">
        Erro:{' '}
        {JSON.stringify(error) || error.message || 'Erro não identificado'}
      </Text>
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
