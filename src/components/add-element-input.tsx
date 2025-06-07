import { Input, InputProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface AddElementInputProps extends InputProps {
  registerName: string
  placeholder: string
}

export function AddElementInput({
  registerName,
  placeholder,
  ...props
}: AddElementInputProps) {
  const { register } = useFormContext()

  return (
    <Input
      color="gray1"
      border="1px solid"
      borderColor="border"
      placeholder={placeholder}
      variant="ghost"
      bg="transparent"
      w={{ base: '90vw', md: '80vw', lg: '60vw' }}
      required
      {...register(registerName)}
      {...props}
    />
  )
}
