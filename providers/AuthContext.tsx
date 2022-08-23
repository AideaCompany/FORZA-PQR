// import { getPrivilege } from '@/graphql/privilege/queries/getPrivilege'
// import { listSection } from '@/graphql/queries'
// import { getUserFn } from '@/services/users'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
//next
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { $security } from '../config'
import { setToken } from '../axios/axios'
import { getUserFn } from '../services/users.service'
// import client, { default as Client, setToken } from '../graphql/config'
import { Privilege, Sections, User } from '../types/types'
import useData from './DataContext'
import { getPrivilegeFn } from '../services/privilege.service'
import { listSectionsFn } from '../services/sesssion.service'
// import useData from './DataContext'

type typeAuthContext = {
  user: User
  isAuthenticated: boolean
  login: (token: string, firstLogin?: boolean) => Promise<void>
  loading: boolean
  logout: () => void
  permission: Privilege
  setLoading: Dispatch<SetStateAction<boolean>>
  setSpinning: Dispatch<SetStateAction<boolean>>
  spinning: boolean
  section: Sections[]
}

const AuthContext = React.createContext<typeAuthContext>({} as typeAuthContext)

export const AuthProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props
  const { section } = useData()
  //next
  const router = useRouter()
  //States
  const [user, setUser] = useState<User>({} as User)
  //@ts-ignore
  const [permission, setPermission] = useState<Privilege>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [spinning, setSpinning] = useState(true)

  const checkAuth = async () => {
    setLoading(true)
    if (section.length > 0) {
      if (Cookie.get('authTokenPanel') !== undefined) {
        const data = jwt.verify(Cookie.get('authTokenPanel') as string, $security.secretKey) as { data: User }
        const user = await getUserFn()
        setUser(user)
        var totalPrivilege: Privilege = JSON.parse(JSON.stringify(user.PrivilegeId))
        totalPrivilege.permissions?.map(l => (l.sectionName = section.find(r => r._id === l.sectionID)?.name))
        setPermission(totalPrivilege)
      } else {
        if (!['/', '/sales/createSale', '/sales/customProfile', '/sales/frecuency', '/sales/mySales'].includes(router.pathname) && !router.pathname.includes('session')) {
          console.log('60')
          router.push(`/session`)
        }
      }
    }
    setLoading(false)
    setSpinning(false)
  }

  //Effect
  useEffect(() => {
    checkAuth()
  }, [section])

  //functions

  const login = async (token: string, firstLogin?: boolean) => {
    const data = jwt.verify(token, $security.secretKey) as { data: User }
    const user = await getUserFn()
    setUser(user)
    const perm = await getPrivilegeFn()
    if (firstLogin) {
      const sections: Sections[] = await listSectionsFn()
      var totalPrivilege: Privilege = perm
      totalPrivilege.permissions?.map(l => (l.sectionName = sections.find(r => r._id === l.sectionID)?.name))
      setPermission(totalPrivilege)
    } else {
      var totalPrivilege: Privilege = perm
      totalPrivilege.permissions?.map(l => (l.sectionName = section.find(r => r._id === l.sectionID)?.name))
      setPermission(totalPrivilege)
    }
    Cookie.set('authTokenPanel', token, { expires: 1 })
    setSpinning(false)
    setLoading(false)
    setToken(token)
    router.push({ pathname: '/sales/createSale' })
  }

  const logout = () => {
    setUser({} as User)
    //@ts-ignore
    setPermission({})
    Cookie.remove('authTokenPanel')
    console.log('100')
    router.push({ pathname: '/session' })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        permission,
        logout,
        setLoading,
        setSpinning,
        spinning,
        section
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
