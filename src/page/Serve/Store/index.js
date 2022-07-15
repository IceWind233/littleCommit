import ApolloClient, {gql} from "apollo-boost";
import {useEffect, useState} from "react";
import Item from "../../../component/Item";

export default function Store(){

    const apikey = '2lBDx35pWMprMB5HZf4bKSJOhfNiVCPhYJDfz-LnWxX'
    const client = new ApolloClient({
        uri: 'http://101.43.154.87:3000/graphql',
        headers: {
            Authorization : `Bearer apikey,${apikey}`
        }})

    const [info, setInfo] = useState()
    const [isLoad, setLoad] = useState(true)

    useEffect(()=>{
        const getInfo = async () => {
            const res = await client.query({query:gql`
            query{
                life_service8__c{
                    life_service8_id__c
                    life_service8_name__c
                    life_service8_score__c
                    life_service8_local__c
                    life_service8_img__c
                }
            }
        `
            });
            setInfo(res.data.life_service8__c)
            setLoad(false)
        }
        getInfo()
    }, [])

    const showHairCut = () => {

        return info
            .filter(obj=>
                obj.life_service8_name__c.includes('店')||
                obj.life_service8_name__c.includes('超市'))
            .map(obj=><Item
                key={obj.life_service8_id__c}
                name={obj.life_service8_name__c}
                address={obj.life_service8_local__c}
                score={obj.life_service8_score__c}
                pic={obj.life_service8_img__c}
                sort={'store'}
            />)
    }

    return<>
        {isLoad ? <div>
            Loading...
        </div> : (showHairCut())}
    </>

}