import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { GetUser } from '../firebase-config'

export interface userType {
  email: string | null
  userName: string | null
  userPhoto: string | null
  id: string | null
}

interface UserContextBody {
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
}

interface UserContextProviderProps {
  children: ReactNode
}

const UserContext = createContext({} as UserContextBody)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState({} as userType)

  useEffect(() => {
    GetUser(setUser)
  }, [])

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
