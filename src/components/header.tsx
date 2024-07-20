import { Box } from '@chakra-ui/react'
import { BookmarkSimple, FilePlus, Notebook } from '@phosphor-icons/react'
import { ToolTipComponent } from './tooltip'
import { CustomNavLink } from './custom-navlink'

export function Header() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      position="absolute"
      top="3.5rem"
      p="0 2rem"
    >
      <Box display="flex" alignItems="center" gap="1rem">
        <ToolTipComponent label="Adicionar">
          <CustomNavLink to={'/'}>
            <FilePlus size="1.5rem" cursor="pointer" />
          </CustomNavLink>
        </ToolTipComponent>
        <ToolTipComponent label="Agenda completa">
          <CustomNavLink to={'/everything-on-planner'}>
            <Notebook size="1.5rem" cursor="pointer" />
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
