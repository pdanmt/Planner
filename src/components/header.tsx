import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import {
  BookmarkSimple,
  FilePlus,
  ToggleLeft,
  List,
  ToggleRight,
  SignOut,
  Sun,
  Moon,
} from '@phosphor-icons/react'
import { ToolTipComponent } from './tooltip'
import { CustomNavLink } from './custom-navlink'
import { useContext } from 'react'
import { AddElementContext } from '../contexts/element-context'
import { useUser } from '../contexts/user-context'
import { MenuItemComponent } from './menu-item'
import { handleSignOut } from '../firebase-config'
import { ThemeContext } from '../contexts/theme-context'

export function Header() {
  const { user } = useUser()
  const { changeTheme, theme } = ThemeContext()
  const { SetHighContrast, highContrast } = useContext(AddElementContext)

  return (
    <Box w="100%" bg="bg" height="13rem">
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
            <Icon as={List} color="fr" fontSize={22} />
          </MenuButton>
          <MenuList bg="primaryFr" border="1px solid" borderColor="mutedFr">
            <MenuItem
              bg="primaryFr"
              border="2px solid transparent"
              borderRadius="6px"
              display="flex"
              alignItems="left"
              flexDir="column"
            >
              <Text fontSize="1.2rem">{user.userName}</Text>
              <Text color="mutedFr">{user.email}</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItemComponent fn={SetHighContrast}>
              Alto contraste
              {highContrast ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </MenuItemComponent>
            <MenuItemComponent fn={changeTheme}>
              {theme ? 'Tema claro' : 'Tema escuro'}
              {theme ? <Sun size={22} /> : <Moon size={22} />}
            </MenuItemComponent>
            <MenuItemComponent color="destructive" fn={handleSignOut}>
              <Text>Sair da conta</Text>
              <SignOut size={22} />
            </MenuItemComponent>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}
