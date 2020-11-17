import styled from 'styled-components';
import React, {useContext} from 'react'
import {AuthContext} from '../../contexts'
import {setAuthToken} from '../../utils'

import {
  Link,
  useLocation,
  useHistory
} from 'react-router-dom'

const Root = styled.div``

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom:1px solid rgba(0, 0, 0, 0.2);
  padding: 0 32px;
  box-sizing: border-box;
  background: white;
`

const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
`

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 64px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${props => props.$active && `background: rgba(0, 0, 0, 0.2)`}
`

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 64px;
  }
`

function Header() {
  const {user, setUser} = useContext(AuthContext)
  const location = useLocation()
  const history = useHistory()
  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
    if(location.pathname !== '/') {
      history.push('/')
    }
  }
  return (
    <HeaderContainer>
     <LeftContainer>
      <Brand>
          部落格
        </Brand>
        <NavbarList>
          <Nav to='/' $active={location.pathname === '/'}>首頁</Nav>
          {user && <Nav to='/new-post' $active={location.pathname === '/new-post'}>發布文章</Nav>}
        </NavbarList>
     </LeftContainer>
     <NavbarList>
       {!user && <Nav to='/login' $active={location.pathname === '/login'}>登入</Nav>}
       {user && <Nav onClick={handleLogout} >登出</Nav>}
     </NavbarList>
    </HeaderContainer>
  )
}

export default Header;
