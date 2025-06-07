import { Button, Flex, Select } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddElementContext } from '../contexts/element-context'
import { AddElementInput } from './add-element-input'
import { AddSubject } from './add-subject'

export interface FormData {
  addActivities: string
  selectedSubject: string
  contentTask: string
  id: string
  isFinished: boolean
  createdAt: string
}

export function AddElement() {
  const { dispatchAddElement, subjects } = useContext(AddElementContext)

  const plannerInputsSchema = z.object({
    addActivities: z.string().optional(),
    selectedSubject: z.string().optional(),
    contentTask: z.string().optional(),
  })

  const addElementForm = useForm<FormData>({
    resolver: zodResolver(plannerInputsSchema),
  })

  const { handleSubmit, register, reset } = addElementForm

  async function handleAddElementInPlanner(data: FormData) {
    if (
      data.addActivities !== '' ||
      data.contentTask !== '' ||
      data.selectedSubject !== ''
    ) {
      dispatchAddElement(data)
    }

    reset()
  }

  return (
    <FormProvider {...addElementForm}>
      <form onSubmit={handleSubmit(handleAddElementInPlanner)}>
        <Flex
          align="center"
          direction={{ base: 'column', lg: 'row' }}
          justify="center"
          gap="1rem"
          w={{ base: '90%', md: '80%', lg: '70%' }}
          m="0 auto 1rem"
        >
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
            borderColor="border"
            background="transparent"
            required
            w={{ base: '90vw', md: '80vw', lg: '60vw' }}
            sx={{
              option: {
                background: 'bg',
                color: 'fr',
              },
            }}
          >
            <option value="">Selecione uma matéria</option>
            {subjects.map(([subject]) => (
              <option key={subject}>{subject}</option>
            ))}
          </Select>
          <Flex gap="1rem">
            <Button
              variant="ghost"
              type="submit"
              border="1px solid"
              borderColor="green2"
              color="green1"
              fontWeight="bold"
              minW="200px"
              maxW="250px"
              _hover={{ background: 'green2', color: '#fff' }}
            >
              Enviar
            </Button>
            <AddSubject />
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  )
}
