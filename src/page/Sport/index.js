
import {useEffect, useState} from "react";

import ApolloClient, {gql} from "apollo-boost";

import Item from "../../component/Item";

export default function Sport(){

    const apikey = '2lBDx35pWMprMB5HZf4bKSJOhfNiVCPhYJDfz-LnWxX'
    const [isLoad, setLoad] = useState(true)
    const [info, setInfo] = useState()

    const client = new ApolloClient({
        uri: 'http://101.43.154.87:3000/graphql',
        headers: {
            Authorization : `Bearer apikey,${apikey}`
        }})

    useEffect(()=>{
        const getInfo = async () => {
            const res = await client.query({query:gql`
            query{
                sport8__c{
                    sport8_id__c
                    sport8_name__c
                    sport8_score__c
                    sport8_local__c
                    sport8_img__c
                }
            }
        `})
            setInfo(res.data.sport8__c)
            setLoad(false)
        }
        getInfo()
    }, [])
    const showSports = () => {
        console.log(info)
        return info.map(obj=><Item
            key={obj.sport8_id__c}
            name={obj.sport8_name__c}
            score={obj.sport8_score__c}
            address={obj.sport8_local__c}
            pic={obj.sport8_img__c}
            sort={'sports'}
        />)

    }

    return<>
        {isLoad ? (
            <div>Loading...</div>
        ) : showSports()
        }
    </>
}