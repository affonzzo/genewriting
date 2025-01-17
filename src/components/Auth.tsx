import { supabase } from '../lib/supabase'
import CustomAuth from './CustomAuth'

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <CustomAuth />
      </div>
    </div>
  )
}
