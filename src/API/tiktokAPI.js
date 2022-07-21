import axiosClient from "./axiosClient"

export const getSearchResult = async (api, options)=>
{
    try 
    {
        const {recordset} = await axiosClient.get(api, {params:options});
        return recordset; 
    }
    catch(error)
    {
        throw Error(error);
    }
}
export const checkInfor = async (api, options)=>
{
    try 
    {
        await axiosClient.post(api, options);
    }
    catch(error)
    {
        throw Error(error);
    }
}
export const getProfile = async (api)=>
{
    try 
    {
        const {recordset}= await axiosClient.get(api);
        return recordset;
    }
    catch(error)
    {
        throw Error(error);
    }
}