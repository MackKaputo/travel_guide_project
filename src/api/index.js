import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'  //Api link to be moved to .env

const options = {
    url: URL,
    
};
/**
 * 
 * @param {*} sw : south west
 * @param {*} ne : north east
 * @returns 
 */
export const getPlacesData = async (sw, ne) => {
    try {
          const { data: { data }} =  await axios.get(URL, {
            params: {
              bl_latitude: sw.lat, //bottom_left '11.847676',//
              tr_latitude: ne.lat, //top_right'12.838442',//
              bl_longitude: sw.lng, //'109.095887',
              tr_longitude: ne.lng, //'109.149359'//
           
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': '1cc9cef7e7mshd52c4d62b274316p15b0f2jsnfa8ce09bbacb'
            }
          })

          //console.log(data)
    
          return data
          
    } catch(error) {
        console.log(error)
    }
}

