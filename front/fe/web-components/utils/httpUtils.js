export const getResponse = (response) => {
    if (!response.ok) {
         return response.json().then(json => {
             throw new Error(json.message);
         });
    }
    return response.json();
}
