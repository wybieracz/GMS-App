import { Theme } from '@carbon/react';
import { createContext, useContext, useEffect, useState } from 'react';

const setBodyBackground = (value) => {
  const style = window?.document?.body?.style
  if (style != null) style['backgroundColor'] = value
}

const mediaQuery = window?.matchMedia?.('(prefers-color-scheme: dark)')

const newContextValue = (dark = mediaQuery?.matches ?? false) => (dark ? 'g100' : 'white')
const ThemeContext = createContext(newContextValue())

const AutoTheme = ({ children }) => {

  const [theme, setTheme] = useState(newContextValue())

  useEffect(() => {
    const cancel = new AbortController()
    mediaQuery?.addEventListener('change', (e) => setTheme(newContextValue(e.matches)), { signal: cancel.signal })
    return () => cancel.abort()
  }, [])

  useEffect(() => setBodyBackground(theme === 'g100' ? 'black' : 'unset'), [theme])

  return (
    <ThemeContext.Provider value={theme}>
      <Theme theme={theme}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext)

export { AutoTheme, useTheme }
