import React from 'react';
import axios from "axios";

export const Axios = () => {

    const requestKey = 'jC35CfzUAWtBEfPALcB1XCffxaxiT8yz';
    const city = 'berlin';

    const getCity = async (city: string) => {
        const response = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/search', {
            headers: {
                Authorization: `?apikey=${requestKey}&q=`
            },
            params: {
                query: city
            }
        });
        console.log(response);
        return response;
    }

    getCity(city).then(data=>data).catch(err=>err);


    return (
        <div>
            <h2>City</h2>
            <h2>Country</h2>

        </div>
    );
};

