export const fetchService = async (url, method='GET', bodyContent) => {

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }

    let response = await fetch(url, { 
        method: method,
        body: JSON.stringify(bodyContent),
        // body: bodyContent,
        headers: headersList
      });
      return response
}   