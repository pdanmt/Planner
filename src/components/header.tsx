import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  BookmarkSimple,
  FilePlus,
  ToggleLeft,
  List,
  ToggleRight,
} from '@phosphor-icons/react'
import { ToolTipComponent } from './tooltip'
import { CustomNavLink } from './custom-navlink'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'

export function Header() {
  const { SetHighContrast, highContrast } = useContext(AddElementContext)

  return (
    <Box w="100%" bg="primary" height="13rem">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        paddingTop="2rem"
      >
        <Box display="flex" alignItems="center" gap="1rem">
          <CustomNavLink to={'/'}>
            <ToolTipComponent label="Adicionar">
              <FilePlus size="1.5rem" cursor="pointer" />
            </ToolTipComponent>
          </CustomNavLink>

          <CustomNavLink to={'/planner'}>
            <ToolTipComponent label="Agenda em matérias">
              <BookmarkSimple size="1.5rem" cursor="pointer" />
            </ToolTipComponent>
          </CustomNavLink>
        </Box>
        <Menu>
          <MenuButton
            as={Button}
            bg="none"
            _hover={{ bg: 'none' }}
            _active={{ bg: 'gray5' }}
          >
            <Icon as={List} color="white" fontSize={22} />
          </MenuButton>
          <MenuList
            bg="primary"
            border="1px solid"
            borderColor="gray4"
            w="120%"
          >
            <MenuItem
              bg="primary"
              border="2px solid transparent"
              borderRadius="6px"
              _hover={{ border: '2px solid', borderColor: 'gray2' }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => SetHighContrast()}
            >
              Alto contraste
              {highContrast ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}
