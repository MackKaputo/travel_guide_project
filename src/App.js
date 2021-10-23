import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from './api'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'



function App() {
  const [places, setPlaces] = useState([])

  const [coordinates,setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)  

  useEffect(() => {
    // Get user current location using the browser's geolocation
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    // console.log(coordinates, bounds)

    // console.log("=================111=====================")
    // console.log(bounds)
    // console.log("==================222====================")
    // Wait for bound to set from Map before making API request 
    if(bounds) {
      getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        //console.log(data)

        setPlaces(data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    
  }, [coordinates, bounds])
  
  return (
    <React.Fragment>
        <CssBaseline />
        <Header />
        
        <Grid container spacing={3} style={{ width: "100%"}}>
            <Grid item xs={12} md={4}>
                <List places={places} />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                    setCoordinates={setCoordinates}
                    setBounds={setBounds} 
                    coordinates={coordinates}
                />
            </Grid>
        </Grid>
    </React.Fragment>
  )
}

export default App
