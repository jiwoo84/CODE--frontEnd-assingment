export default async function useFetchData() {
    const url = 'https://api.coingecko.com/api/v3/exchanges';
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = await res.json();
    return data;
}