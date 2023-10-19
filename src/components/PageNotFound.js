import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="main-content">
      <h2 style={{ margin: '40px' }}>Страница не найдена</h2>
      <Link to="/">Перейти на главную</Link>
    </div>
  )
}
