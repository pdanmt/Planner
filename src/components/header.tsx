import { Box } from '@chakra-ui/react'
import { BookmarkSimple, FilePlus } from '@phosphor-icons/react'
import { ToolTipComponent } from './tooltip'
import { CustomNavLink } from './custom-navlink'

export function Header() {
  return (
    <Box
      w="100%"
      bg="primary"
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      paddingTop="2rem"
      height="13rem"
    >
      <Box display="flex" alignItems="center" gap="1rem">
        <ToolTipComponent label="Adicionar">
          <CustomNavLink to={'/'}>
            <FilePlus size="1.5rem" cursor="pointer" />
          </CustomNavLink>
        </ToolTipComponent>
        <ToolTipComponent label="Agenda em matérias">
          <CustomNavLink to={'/planner'}>
            <BookmarkSimple size="1.5rem" cursor="pointer" />
          </CustomNavLink>
        </ToolTipComponent>
      </Box>
    </Box>
  )
}
