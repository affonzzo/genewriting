import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'
import { AuthModal } from './AuthModal'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { LogOut, User as UserIcon, Settings } from 'lucide-react'

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    // Verificar usuário atual
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    getUser()

    // Escutar mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowAuthModal(true)}
          className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md hover:bg-luxury-50 dark:hover:bg-luxury-800 transition-colors"
        >
          Entrar
        </button>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    )
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button 
          className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
          title={user.email}
        >
          {user.email?.[0].toUpperCase()}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white dark:bg-luxury-800 rounded-lg p-2 shadow-lg will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-50 border border-gray-100 dark:border-luxury-700"
          sideOffset={5}
          align="end"
        >
          <div className="px-2 py-1.5 mb-1">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {user.email}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Usuário GeneWriting
            </div>
          </div>
          
          <DropdownMenu.Separator className="h-[1px] bg-gray-100 dark:bg-luxury-700 my-1" />
          
          <DropdownMenu.Item 
            className="text-sm text-gray-700 dark:text-gray-200 rounded-md flex items-center px-2 py-1.5 select-none outline-none data-[highlighted]:bg-luxury-50 dark:data-[highlighted]:bg-luxury-700 cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </DropdownMenu.Item>

          <DropdownMenu.Item 
            className="text-sm text-gray-700 dark:text-gray-200 rounded-md flex items-center px-2 py-1.5 select-none outline-none data-[highlighted]:bg-luxury-50 dark:data-[highlighted]:bg-luxury-700 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-white dark:fill-luxury-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
