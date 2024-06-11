import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from 'next-themes'

export default function Header() {
  return (
    <header className='py-4'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex items-center justify-between gap-4'>
        <li className='text-xl font-extrabold font-mono'>
            <Link href='/'>designgen</Link>
          </li>
          <li>
            <Link href='/dashboard'>DashBoard</Link>
          </li>
          <li>
            <Link href='/gallery'>Gallery</Link>
          </li>
        </ul>
        <div className='flex items-center justify-between gap-6 '>
        <ModeToggle />
          <SignedOut>
            <SignInButton mode='modal'>
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
