import {
  Header, HeaderContainer, HeaderGlobalAction,
  HeaderGlobalBar, HeaderMenuButton, HeaderMenuItem,
  HeaderName, HeaderNavigation, HeaderSideNavItems,
  SideNav, SideNavItems, SkipToContent
} from '@carbon/react'
import { Logout } from '@carbon/react/icons'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleLogout } from './AppHeaderUtils'
import NotificationContext from '../../context/NotificationContext'

const AppHeader = ({ user, setUser }) => {

  const navigate = useNavigate();
  const notifications = useContext(NotificationContext)

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label='GM System'>
          <SkipToContent />
          <HeaderMenuButton
            aria-label='Open menu'
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName element={Link} to='/' prefix='GM'>
            System
          </HeaderName>
          <HeaderNavigation aria-label='Nav header'>
            {user?.id ?
              <>
                <HeaderMenuItem element={Link} to='/'>
                  Dashboard
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to='/devices'>
                  Devices
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to='/settings'>
                  Settings
                </HeaderMenuItem>
              </>
              : null
            }
          </HeaderNavigation>
          <SideNav
            aria-label='Side navigation'
            expanded={isSideNavExpanded}
            isPersistent={false}
          >
            <SideNavItems>
              <HeaderSideNavItems>
                {user?.id ?
                  <>
                    <HeaderMenuItem element={Link} to='/'>
                      Dashboard
                    </HeaderMenuItem>
                    <HeaderMenuItem element={Link} to='/devices'>
                      Devices
                    </HeaderMenuItem>
                    <HeaderMenuItem element={Link} to='/settings'>
                      Settings
                    </HeaderMenuItem>
                  </>
                  : null
                }
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar>
              { user?.id ? 
              <HeaderGlobalAction
                aria-label='Logout'
                tooltipAlignment='end'
                onClick={() => handleLogout(user, setUser, navigate, notifications)}
              >
              <Logout size={20} />
              </HeaderGlobalAction>
              : null }
          </HeaderGlobalBar>
        </Header>
      )}
    />
  )
}

export default AppHeader
