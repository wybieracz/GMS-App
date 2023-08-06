import { Theme } from '@carbon/react';
import { createContext, useContext, useEffect, useState } from 'react';

const setBackground = (value) => {
  const style = window?.document?.body?.style;
  if (style != null) style['backgroundColor'] = value;
}

const query = window?.matchMedia?.('(prefers-color-scheme: dark)')

const getThemeContextValue = (dark = query?.matches ?? false) => (dark ? 'g100' : 'white');
const ThemeContext = createContext(getThemeContextValue());

const AutoTheme = ({ children }) => {

  const [theme, setTheme] = useState(getThemeContextValue());

  useEffect(() => {
    const cancel = new AbortController();
    query?.addEventListener('change', (e) => setTheme(getThemeContextValue(e.matches)), { signal: cancel.signal });
    return () => cancel.abort();
  }, [])

  useEffect(() => setBackground(theme === 'g100' ? 'black' : 'unset'), [theme])

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
