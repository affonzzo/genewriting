import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

type UserType = 'empresario' | 'copywriter' | 'marketer' | 'expert';

interface SuccessModalProps {
  email: string;
  onClose: () => void;
}

function SuccessModal({ email, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">Confirme seu email</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enviamos um link de confirmação para <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>Para começar a usar o GeneWriting, você precisa confirmar seu email. Por favor:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Abra seu email</li>
            <li>Clique no link de confirmação que enviamos</li>
            <li>Volte aqui para fazer login</li>
          </ol>
          <p className="text-xs">
            Não recebeu o email? Verifique sua pasta de spam ou solicite um novo email de confirmação.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => handleSignUp(email)}
            className="text-sm font-medium text-primary hover:text-primary/90"
          >
            Reenviar email
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CustomAuth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [userType, setUserType] = useState<UserType>('empresario');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent | string) => {
    if (e instanceof Event) e.preventDefault();
    const emailToUse = typeof e === 'string' ? e : email;
    
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signUp({
        email: emailToUse,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            first_name: firstName,
            last_name: lastName,
            whatsapp: whatsapp,
            user_type: userType,
          }
        }
      });

      if (error) throw error;
      setShowSuccessModal(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatWhatsApp = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      {showSuccessModal && (
        <SuccessModal 
          email={email} 
          onClose={() => {
            setShowSuccessModal(false);
            setIsSignUp(false);
          }} 
        />
      )}
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-card/50 backdrop-blur-sm p-8 shadow-xl border border-muted">
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center">
            <img 
              src="/assets/GeneLogo.png" 
              alt="GeneWriting" 
              className="h-14 w-auto object-contain drop-shadow-md" 
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {isSignUp ? 'Criar nova conta' : 'Bem-vindo de volta'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isSignUp ? 'Preencha seus dados para começar' : 'Entre na sua conta para continuar'}
          </p>
        </div>

        <form className="space-y-5" onSubmit={isSignUp ? handleSignUp : handleLogin}>
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1.5">
                      Nome
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                      placeholder="João"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1.5">
                      Sobrenome
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                      placeholder="Silva"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-1.5">
                    WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                    </div>
                    <input
                      id="whatsapp"
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                      className="block w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2.5 text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-foreground mb-1.5">
                    Você é
                  </label>
                  <select
                    id="userType"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                    className="block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                    required
                  >
                    <option value="empresario">Empresário</option>
                    <option value="copywriter">Copywriter</option>
                    <option value="marketer">Marketer</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                {isSignUp ? 'Melhor Email' : 'Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2.5 text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2.5 text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="relative flex w-full justify-center items-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-all"
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? (isSignUp ? 'Criando conta...' : 'Entrando...') : (isSignUp ? 'Criar conta' : 'Entrar')}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                if (!isSignUp) {
                  setFirstName('');
                  setLastName('');
                  setWhatsapp('');
                  setUserType('empresario');
                }
              }}
              className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
            >
              {isSignUp ? 'Já tem uma conta? Entre aqui' : 'Criar nova conta'}
            </button>
            {!isSignUp && (
              <button
                type="button"
                className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
              >
                Esqueceu a senha?
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
