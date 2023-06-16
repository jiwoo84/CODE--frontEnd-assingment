export default async function useFetchData(endPoint: string = '') {
    const url = 'https://api.coingecko.com/api/v3/exchanges';

    const res = await fetch(`${url}${endPoint}`, {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${endPoint} data`)
    }

    const data = await res.json();
    return data;
}