const baseUrl = import.meta.env.VITE_APP_API_BASE_URL
console.log(baseUrl)

const fetchHome =async () => {
    const response = await fetch(`${baseUrl}/api/customer/home`)
    const data = await response.json()
    console.log(data)
    return data;
}
// fetchHome() 