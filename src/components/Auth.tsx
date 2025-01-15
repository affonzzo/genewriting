import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'

export default function Auth() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgb(var(--primary))',
                  brandAccent: 'rgb(var(--primary-foreground))',
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
    </div>
  )
}
