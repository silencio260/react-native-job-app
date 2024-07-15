import {useState, useEffect} from 'react'
import axios from 'axios'
// import {RAPID_API_KEY} from '@env'

// const rapidApiKey = RAPID_API_KEY;
import MyJson from './data.json'

const useFetch = (endPoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endPoint}`,
        params: {...query},
        headers: {
          'X-RapidAPI-Key': '',//'5a9e8f4946msh0aaf216505a280dp12844ajsn142db2a0e751',//rapidApiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true)

        try {
            // const response = await axios.request(options)
            
            
            console.log('my json $$$$$$$$$$$$',MyJson)
            const response = MyJson;
            console.log('Respone data',response.data.data)
            // setData(response)
            setData(response.data.data)      
            setIsLoading(false)
            
        } catch (error) {
            setError(error)
            alert('There is an error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData();
    }

    return { data, isLoading, error, refetch}
}

export default useFetch

