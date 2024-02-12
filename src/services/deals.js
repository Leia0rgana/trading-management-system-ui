const BASE_URL = `http://localhost:8083`

export async function fetchDeals(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`)
  const data = await response.json()
  return data
}
