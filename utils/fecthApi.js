import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com"

export const fecthApi = async (url) => {
  const {data} = await axios.get((url),{
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': 'c33356a999msh66c3bec0da47714p142a91jsn24c1b3083614'
    }
  })

  return data
}