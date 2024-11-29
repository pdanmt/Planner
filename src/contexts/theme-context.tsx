import { createContext, ReactNode, useContext, useState } from 'react'

interface ThemeContextProviderProps {
  children: ReactNode
}

interface themContextBody {
  theme: boolean
  changeTheme: () => void
  setTheme: React.Dispatch<React.SetStateAction<boolean>>
}

const themeContext = createContext({} as themContextBody)

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const getStorageTheme = JSON.parse(
    localStorage.getItem('planner-1.0:theme') || 'true',
  )

  const [theme, setTheme] = useState<boolean>(getStorageTheme)

  function changeTheme() {
    setTheme((state) => !state)
    localStorage.setItem('planner-1.0:theme', JSON.stringify(!theme))
  }

  return (
    <themeContext.Provider value={{ setTheme, theme, changeTheme }}>
      {children}
    </themeContext.Provider>
  )
}

export const ThemeContext = () => useContext(themeContext)
