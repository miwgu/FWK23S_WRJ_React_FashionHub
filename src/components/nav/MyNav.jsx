import React, {useContext, useState, useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import LoginModal from '../LoginModal';
import Logout from '../Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';
import { useNavigate } from "react-router-dom";


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

 

const MyNav=({onSearch, products})=> {
  const { loggedIn,setLoggedIn, user, setUser } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] =useState('');
  const [totalQuantity, setTotalQuantity] = useState(0);
  //const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(searchTerm);
  }

  /* const isTokenExpired =() =>{
    const tokenExp = JSON.parse(localStorage.getItem('loggedInUserData'));
    if (!tokenExp || !tokenExp.exp) {
      return true; // Token or expiration time not found, consider it expired
    }

    const currentTime = Math.floor(Date.now() / 1000);
    console.log("CURRENT:",currentTime)
    console.log("EXP:",tokenExp.exp)
    return currentTime > parseInt(tokenExp.exp);
  };
 

    useEffect(() => {
      if(isTokenExpired()){
        setLoggedIn(false);
        setUser(null);
        localStorage.removeItem('loggedInUserData'); // Remove the logged-in user data from localStorage
        localStorage.removeItem('access_token');//Remove the access token
        navigate("/");
        alert('Session expired. Please login again!')
      }
        
    }, [loggedIn]); //Re-run this effect when loggedIn state changes
 */
    
    useEffect(() => {
      const handleShoppingBagUpdate = () => {
          // Update totalQuantity when shopping bag is updated
          const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
          let total = 0;
          storedProducts.forEach((product) => {
              total += product.quantity || 0;
          });
          setTotalQuantity(total);
      };
  
      // Listen for shoppingBagUpdated event
      window.addEventListener('shoppingBagUpdated', handleShoppingBagUpdate);
  
      // Call the handler initially to ensure totalQuantity is updated when the component mounts
      handleShoppingBagUpdate();
  
      // Cleanup function
      return () => {
          window.removeEventListener('shoppingBagUpdated', handleShoppingBagUpdate);
      };
  }, []);

    useEffect(()=>{
      const tokenInfo= () =>{
        try{
          const token = localStorage.getItem('access_token');
          
          setTokenInfo(tokenInfo);
          
          const currentTime = Math.floor(Date.now()/1000);
          
          
        }catch{

        }
      }

    },[])
    
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true); // Open the login modal when the user clicks the login icon
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false); // Close the login modal
  };

  return (
    <AppBar position="static">
        <LoginModal isOpen={loginModalOpen} onClose={handleLoginModalClose} />
    
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e)=>setSearchTerm(e.target.value)}
                onBlur={handleSearch}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                     }
                }}
              />
            </Search>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton
              size="large"
              aria-label="search"
              color="inherit"
            >
              <SearchIcon />
            </IconButton> */}
          
            <IconButton
              component={Link}
              to="/cart"
              size="large"
              aria-label="show cart"
              color="inherit"
            >
              <Badge badgeContent={totalQuantity} color="error">
                 <ShoppingBagIcon />
              </Badge>
            </IconButton>
            

            {/* {user ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.firstname} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              ) : (
                <IconButton
                  size="large"
                  onClick={handleLoginModalOpen}
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
              )} */}

          </Box>
        
        
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.firstname} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton
                size="large"
                onClick={handleLoginModalOpen}
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                setting === 'Logout' ?
                <Logout key={setting} />:
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>



{/*           {user &&(
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?user.firstname:''} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                setting === 'Logout' ?
                <Logout key={setting} />:
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          )} */}


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MyNav;
