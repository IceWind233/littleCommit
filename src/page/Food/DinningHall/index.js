import Item from "../../../component/Item";
import {useEffect, useState} from "react";
import ApolloClient, {gql} from "apollo-boost";

export default function DinningHall(){

    const apikey = '2lBDx35pWMprMB5HZf4bKSJOhfNiVCPhYJDfz-LnWxX'
    const [info, setInfo] = useState()
    const [isLoad, setLoad] = useState(true)
    const client = new ApolloClient({
        uri: 'http://101.43.154.87:3000/graphql',
        headers: {
            Authorization : `Bearer apikey,${apikey}`
        }})

    useEffect(()=>{
        const getInfo = async () => {
            const req = await client.query({query:gql`
            query{
                cuisine8__c{
                    cuisine8_id__c
                    cuisine8_name__c
                    cuisine8_score__c
                    cuisine8_local__c
                }
            }
        `
            });
            setInfo(req.data.cuisine8__c)
            setLoad(false)
        }
        getInfo()
    },[])

    const showDinningHall = ()=>{
        return info
            .filter(obj=>
                obj.cuisine8_name__c.includes('食堂') ||
                obj.cuisine8_name__c.includes('餐厅'))
            .map(obj=><Item
            key={obj.cuisine8_id__c}
            name={obj.cuisine8_name__c}
            address={obj.cuisine8_local__c}
            score={obj.cuisine8_score__c}
            sort={'dinningHall'}
        />)
    }

    return<>
        {
            isLoad ? (
                <div>Loading ...</div>
            ) : (
            showDinningHall())
        }
    </>
}