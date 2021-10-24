import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from './api'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'



function App() {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [coordinates,setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)

  const [type, setType] = useState('restaurants')
  const [rating, setRating ] = useState('')

  const [childClicked, setChildClicked] = useState(null)

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    // Get user current location using the browser's geolocation
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)

    setFilteredPlaces(filteredPlaces)
  },[rating])

  useEffect(() => {
    
    // Wait for bound to set from Map before making API request 
    if(bounds) {
      setLoading(true)
      // Fetch data
      getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        //console.log(data)

        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0 ))
        setFilteredPlaces([])
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    
  }, [type, bounds])
  
  return (
    <React.Fragment>
        <CssBaseline />
        <Header setCoordinates={setCoordinates} />
        
        <Grid container spacing={3} style={{ width: "100%"}}>
          <Grid item xs={12} md={4}>
                <List 
                    places={ filteredPlaces.length > 0 ? filteredPlaces: places }
                    childClicked={childClicked} 
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                    setCoordinates={setCoordinates}
                    setBounds={setBounds} 
                    coordinates={coordinates}
                    places={filteredPlaces.length > 0 ? filteredPlaces: places}
                    setChildClicked={setChildClicked}
                />
                <div>
                  <h2 style={{ display: "grid", placeItems: "center", margin: "2em", color:"#021129"}}>
                    Click on the map and drag to view more places! 
                  </h2>
                </div>
            </Grid>     
        </Grid>
    </React.Fragment>
  )
}

export default App
