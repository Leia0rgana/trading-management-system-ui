import OpenedDeal from './OpenedDeal'

export default function OpenedDealList({ openedDeals }) {
  return (
    <>
      {openedDeals.map((openedDeal) => (
        <OpenedDeal
          key={openedDeal.id}
          name={openedDeal.name}
          ticker={openedDeal.ticker}
          sum={openedDeal.sum}
          price={openedDeal.price}
          orderDirection={openedDeal.orderDirection}
          dateTime={openedDeal.dateTime}
          quantity={openedDeal.quantity}
        />
      ))}
    </>
  )
}
