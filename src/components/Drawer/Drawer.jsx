import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const myHistory = useHistory()
  const { path } = useRouteMatch()


  const listItems = [
    {
      text: 'Users',
      onClick: () => myHistory.push(`${path}/users`)
    },
    {
      text: 'Add Book',
      onClick: () => myHistory.push(`${path}/add-book`)
    },
    {
      text: 'Book List',
      onClick: () => myHistory.push(`${path}/book-list`)
    }
  ];



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {listItems.map((item, index) => (
            <ListItem key={item.text} onClick={item.onClick} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>

          ))}
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
}
