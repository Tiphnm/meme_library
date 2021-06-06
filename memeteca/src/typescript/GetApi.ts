
export default function getApi() {
    const api_dev = process.env.REACT_APP_API_DEV || "CONFIGURE YOUR ENV VARS"
    const api_prod =  process.env.REACT_APP_API_PROD || "CONFIGURE YOUR ENV VARS"

    /* If the ENV environment is active then our api is in Localhost */ 
    const api_url = process.env.REACT_APP_ENV == "development"?  api_dev : api_prod
    return api_url
}