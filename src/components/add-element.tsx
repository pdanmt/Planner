import { Box, Button, Input, Select } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddElementContext } from '../contexts/add-element-context'

export interface FormData {
  addActivities: string
  selectedSubject: string
  contentTask: string
  id: number
  isFinished: boolean
}

export const options = [
  { value: '1', label: 'Matemática' },
  { value: '2', label: 'Português' },
  { value: '3', label: 'Física' },
  { value: '4', label: 'Biologia' },
  { value: '5', label: 'Geografia' },
  { value: '6', label: 'Química' },
  { value: '7', label: 'História' },
  { value: '8', label: 'Sociologia' },
  { value: '9', label: 'Ed.Física' },
  { value: '10', label: 'Espanhol' },
  { value: '11', label: 'Eletricidade' },
  { value: '12', label: 'Eletrônica Digital' },
  { value: '13', label: 'Desenho' },
  { value: '14', label: 'Informática' },
]

export function AddElement() {
  const { dispatchAddElement } = useContext(AddElementContext)

  const plannerInputsSchema = z.object({
    addActivities: z.string(),
    selectedSubject: z.string(),
    contentTask: z.string(),
  })

  const { handleSubmit, register, reset } = useForm<FormData>({
    resolver: zodResolver(plannerInputsSchema),
  })

  function handleAddElementInPlanner(data: FormData) {
    const id = new Date().getTime() * new Date().getMilliseconds()
    data.id = id
    data.isFinished = false
    dispatchAddElement(data)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(handleAddElementInPlanner)}>
      <Box
        display="flex"
        alignItems="center"
        flexDir={{ base: 'column', lg: 'row' }}
        justifyContent="center"
        gap="1rem"
        w={{ base: '90%', md: '80%', lg: '70%' }}
        margin="0 auto 1rem"
      >
        <Input
          color="gray1"
          border="1px solid"
          borderColor="primary"
          placeholder="Adicione uma atividade"
          variant="ghost"
          bg="transparent"
          w={{ base: '90vw', md: '80vw', lg: '60vw' }}
          required
          {...register('addActivities')}
        />

        <Input
          color="gray1"
          border="1px solid"
          borderColor="primary"
          placeholder="Digite o conteúdo da atividade"
          variant="ghost"
          bg="transparent"
          w={{ base: '90vw', md: '80vw', lg: '60vw' }}
          required
          {...register('contentTask')}
        />

        <Select
          {...register('selectedSubject')}
          variant="ghost"
          border="1px solid"
          borderColor="primary"
          background="transparent"
          required
          w={{ base: '90vw', md: '80vw', lg: '60vw' }}
          placeholder="Selecione uma matéria"
          sx={{
            option: {
              background: 'primary',
              color: 'gray2',
            },
          }}
        >
          {options.map(({ value, label }) => (
            <option key={value}>{label}</option>
          ))}
        </Select>

        <Button
          variant="ghost"
          type="submit"
          border="1px solid"
          borderColor="green2"
          color="green1"
          fontWeight="bold"
          p="0 5rem"
          _hover={{ background: 'green2', color: '#fff' }}
        >
          Enviar
        </Button>
      </Box>
    </form>
  )
}
