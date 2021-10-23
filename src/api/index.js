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
export const getPlacesData = async () => {
    try {
          const { data: { data }} =  await axios.get(URL, {
            params: {
              bl_latitude: '11.847676',//sw.lat, //bottom_left
              tr_latitude: '12.838442',//ne.lat, //top_right
              bl_longitude: '109.095887',//sw.lng,
              tr_longitude: '109.149359'//ne.lng,
           
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

