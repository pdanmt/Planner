import { Box, Button, Icon, Select } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddElementContext } from '../contexts/element-context'
import { AddElementInput } from './add-element-input'
import { Swap } from '@phosphor-icons/react'

export interface FormData {
  addActivities: string
  selectedSubject: string
  contentTask: string
  id: number
  isFinished: boolean
  createdAt: string
  addSubject: string
}

interface storageData {
  label: string
  key: number
}

export function AddElement() {
  const { dispatchAddElement } = useContext(AddElementContext)
  const [modeChange, setModeChange] = useState(true)
  const [storage, setStorage] = useState<storageData[]>(
    JSON.parse(localStorage.getItem('planner-1.0:subjects') || '[]'),
  )

  const plannerInputsSchema = z.object({
    addActivities: z.string().optional(),
    selectedSubject: z.string().optional(),
    contentTask: z.string().optional(),
    addSubject: z.string().optional(),
  })

  const addElementForm = useForm<FormData>({
    resolver: zodResolver(plannerInputsSchema),
  })

  const { handleSubmit, register, reset } = addElementForm

  function handleAddElementInPlanner(data: FormData) {
    if (data.addSubject) {
      const storageLocal = localStorage.getItem('planner-1.0:subjects')

      if (storageLocal !== null) {
        localStorage.setItem(
          'planner-1.0:subjects',
          JSON.stringify([
            ...JSON.parse(storageLocal),
            { label: data.addSubject, key: new Date().getTime() },
          ]),
        )
      } else {
        localStorage.setItem(
          'planner-1.0:subjects',
          JSON.stringify([
            { label: data.addSubject, key: new Date().getTime() },
          ]),
        )
      }

      setStorage((state) => [
        ...state,
        { key: new Date().getTime(), label: data.addSubject },
      ])
    } else {
      dispatchAddElement(data)
    }

    reset()
  }

  function handleModeChange() {
    setModeChange((state) => !state)

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
          {modeChange && (
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
                placeholder={
                  storage.length === 0
                    ? 'Adicione uma matéria'
                    : 'Selecione uma matéria'
                }
                sx={{
                  option: {
                    background: 'primary',
                    color: 'gray2',
                  },
                }}
              >
                {storage.map(({ label, key }) => (
                  <option key={key}>{label}</option>
                ))}
              </Select>
            </>
          )}

          {!modeChange && (
            <AddElementInput
              placeholder="Adicione uma matéria"
              registerName="addSubject"
            />
          )}

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
            <Icon
              as={Swap}
              fontSize={22}
              _hover={{ color: 'green1' }}
              onClick={() => handleModeChange()}
            />
          </Box>
        </Box>
      </form>
    </FormProvider>
  )
}
