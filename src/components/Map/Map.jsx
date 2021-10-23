import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
//import LocationOnOutlinedIcon from '@material-ui/icons/'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'
import { LocationOnOutlined } from '@material-ui/icons'

function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked }) {
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:600px)')
  
  //const coordinates = { lat: 0, lng: 0}

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCxt7QeuSkI9C6G1so6Z3diIXjoUjI_VRw' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          //console.log(e)
          setCoordinates({ lat: e.center.lat, lng: e.center.lng});
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}

        onChildClick={(child) => setChildClicked(child)}
      >
        {
          places && places.map((place, i) => {
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              { /**Display icon if on mobile ,else the card */
                !isDesktop ? (
                  <LocationOnOutlined color="primary" fontSize="large" />
                ) : (
                  <Paper elebation={3} className={classes.paper}>
                      <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                        {place.name}
                      </Typography>
                      <img
                        className={classes.pointer}
                        src={place.photo ? place.photo.images.large.url : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"}
                        alt={place.name}
                      />
                      <Rating size="small" value={Number(place.rating)} readOnly/>
                  </Paper>
                )
              }
            </div>
          })
        }

      </GoogleMapReact>
      
    </div>
  )
}

export default Map
