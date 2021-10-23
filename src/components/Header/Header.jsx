import React from 'react'
import { AutoComplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './styles.js';

function Header() {
    const classes = useStyles()

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#54d431"}}>
          <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Guide by Mack
                </Typography>
                
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new Places
                    </Typography>
                    {/* <Autocomplete> */}
                        <div className={classes.search}>
                            {/* <div className={classes.searchIcon} >
                                <SearchIcon />
                            </div> */}
                            <InputBase placeholder="Search..." classess={{ root: classes.inputRoot, input: classes.inputInput }}/>
                        </div>
                    {/* </Autocomplete> */}

                </Box>
          </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
