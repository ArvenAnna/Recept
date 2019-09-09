export const getResponse = (response) => {
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
}
