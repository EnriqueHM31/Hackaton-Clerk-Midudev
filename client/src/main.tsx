import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import './tailwind.css'
import './assets/js/aos.js'
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/700.css";
import { dark } from '@clerk/themes'
import { esES } from '@clerk/localizations'
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/' appearance={{ baseTheme: dark }} localization={esES}>

      <App />
    </ClerkProvider>
  </React.StrictMode>,
)