import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './styles.js';

function Header({ setCoordinates }) {
    const classes = useStyles()
    const [autocomplete, setAutocomplete] = useState(null)

    const onLoad = (autoC) => {
        setAutocomplete(autoC)
    }

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat()
        const lng = autocomplete.getPlace().geometry.location.lng()

        // const southWest = autocomplete.getPlace().geometry.viewport.getSouthWest()
        // const northEast = autocomplete.getPlace().geometry.viewport.getNorthEast()


        setCoordinates({lat, lng})
        
    }

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#2ab521"}}>
          <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Guide By Mack
                </Typography>
                
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Find and Explore new Places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon} >
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search..." classess={{ root: classes.inputRoot, input: classes.inputInput }}/>
                        </div>
                    </Autocomplete>

                </Box>
          </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
