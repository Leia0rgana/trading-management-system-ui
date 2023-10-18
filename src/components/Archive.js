import { Link } from 'react-router-dom'

export default function Archive() {
  return (
    <>
      <h1>Archive</h1>
      <Link to="/">Go to home</Link>{' '}
      {/*the way we can get to another page without reloading current page*/}
    </>
  )
}
