import { Box, Button, Select } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddElementContext } from '../contexts/element-context'
import { AddElementInput } from './add-element-input'

export interface FormData {
  addActivities: string
  selectedSubject: string
  contentTask: string
  id: number
  isFinished: boolean
  createdAt: string
  addSubject: string
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
    addActivities: z.string().optional(),
    selectedSubject: z.string().optional(),
    contentTask: z.string().optional(),
  })

  const addElementForm = useForm<FormData>({
    resolver: zodResolver(plannerInputsSchema),
  })

  const { handleSubmit, register, reset } = addElementForm

  function handleAddElementInPlanner(data: FormData) {
    dispatchAddElement(data)

    reset()
  }

  return (
    <FormProvider {...addElementForm}>
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
          <>
            <AddElementInput
              placeholder="Adicione uma atividade"
              registerName="addActivities"
            />

            <AddElementInput
              placeholder="Digite o conteúdo da atividade"
              registerName="contentTask"
            />

            <Select
              {...register('selectedSubject')}
              variant="ghost"
              border="1px solid"
              borderColor="primary"
              background="transparent"
              required
              w={{ base: '90vw', md: '80vw', lg: '60vw' }}
              sx={{
                option: {
                  background: 'primary',
                  color: 'gray2',
                },
              }}
            >
              <option value="">Selecione uma matéria</option>
              {options.map(({ label, value }) => (
                <option key={value}>{label}</option>
              ))}
            </Select>
          </>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
          >
            <Button
              variant="ghost"
              type="submit"
              border="1px solid"
              borderColor="green2"
              color="green1"
              fontWeight="bold"
              p="0 5rem"
              w="86%"
              _hover={{ background: 'green2', color: '#fff' }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  )
}
