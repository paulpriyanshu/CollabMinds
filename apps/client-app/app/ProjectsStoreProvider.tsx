'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { ProjectsStore, AppStore } from './lib/ProjectsStore'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = ProjectsStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}