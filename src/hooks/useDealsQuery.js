import { useQuery } from '@tanstack/react-query'
import { fetchDeals } from '../services/deals'

export default function useTodosQuery() {
  return useQuery({
    queryFn: () => fetchDeals(),
    queryKey: ['deals'],
  })
}
