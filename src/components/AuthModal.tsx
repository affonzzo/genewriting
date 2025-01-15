import { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Salve seus textos automaticamente</DialogTitle>
          <DialogDescription>
            Crie uma conta gratuita para salvar seus textos automaticamente e acessá-los de qualquer lugar.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#3b82f6',
                    brandAccent: '#1d4ed8',
                  }
                }
              }
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre aqui'
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  button_label: 'Criar conta',
                  loading_button_label: 'Criando conta...',
                  social_provider_text: 'Criar conta com {{provider}}',
                  link_text: 'Não tem uma conta? Crie aqui'
                },
                magic_link: {
                  button_label: 'Enviar link mágico',
                  loading_button_label: 'Enviando link mágico...',
                  link_text: 'Enviar link mágico para login'
                },
                forgotten_password: {
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando instruções...',
                  link_text: 'Esqueceu sua senha?'
                }
              }
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
