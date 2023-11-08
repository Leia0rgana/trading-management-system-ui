import OpenedDeal from './OpenedDeal'

export default function OpenedDealList({ openedDeals }) {
  return (
    <>
      {openedDeals.map((openedDeal) => (
        <div style={{ marginBlockEnd: '10px' }} key={openedDeal.id}>
          <OpenedDeal
            name={openedDeal.name}
            ticker={openedDeal.ticker}
            sum={openedDeal.sum}
            price={openedDeal.price}
            orderDirection={openedDeal.orderDirection}
            dateTime={openedDeal.dateTime}
            quantity={openedDeal.quantity}
          />
        </div>
      ))}
    </>
  )
}
