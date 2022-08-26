/* eslint-disable @next/next/no-img-element */
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTheme } from '@mui/system';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { MAX_APP_WIDTH } from '../../constants';
import config from '../../lib/config';
import navItems from '../../lib/menu';
import NavItem from './NavItem';

const DRAWER_WIDTH = 240;

export default function Navigation() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const drawer = useMemo(
    () => (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          MUI
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={`drawer-nav-item-${item.title}`} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    ),
    [handleDrawerToggle]
  );

  const container = useMemo(() => (typeof window !== 'undefined' ? window.document.body : undefined), []);

  const theme = useTheme();
  const trigger = useScrollTrigger();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          alignItems: 'center'
        }}
      >
        <Toolbar
          sx={{
            [theme.breakpoints.up('md')]: {
              transition: 'height 0.5s ease;',
              height: trigger ? 64 : 92,
              maxWidth: MAX_APP_WIDTH,
              width: '100%'
            }
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src={config.logo}
            alt={config.site_title}
            sx={{
              transition: 'height,padding 0.5s ease;',
              height: '100%',
              padding: trigger ? '8px 0' : '16px 0',
              boxSizing: 'border-box'
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <NavItem key={`nav-item-${item.title}`} item={item} />
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
