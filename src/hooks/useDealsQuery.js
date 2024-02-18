import { useQuery } from '@tanstack/react-query'
import fetchDeals from '../services/deals'

export default function useDealsQuery(key, endpoint) {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchDeals(endpoint),
  })
}
