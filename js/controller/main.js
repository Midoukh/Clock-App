// import { getApi } from '../model/model'
import { elements } from '../view/base'

async function getApi (){
    try{
        const res = await fetch(`http://api.ipstack.com/41.200.57.204?access_key=5a4f8c969a4f54a00b26462db1773536`)
        .then(response => response.json())
        .then(data => console.log(data));
    }
    catch(error){
        console.error(error)
    }
}

getApi()

