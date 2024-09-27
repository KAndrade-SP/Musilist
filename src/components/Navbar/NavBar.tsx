import styled from 'styled-components'

const NavbarContainer = styled.nav`
  ${({ theme: { colors } }) => `
    background-color: ${colors.darkPurpleBackground};
    color: ${colors.textWhite};
    width: 100vw;
    padding: 1rem 2rem;
    position: relative;
  `}
`;

const NavbarContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
`;

const MenuItem = styled.li`
  color: white;
  cursor: pointer;
`;

const Navbar: React.FC = () => {

  return (
    <>
      <NavbarContainer>
        <NavbarContent>
          <Logo>Logo</Logo>
          <Menu>
            <MenuItem>Home</MenuItem>
            <MenuItem>About</MenuItem>
            <MenuItem>Contact</MenuItem>
          </Menu>
        </NavbarContent>
      </NavbarContainer>
    </>
  )
}

export default Navbar