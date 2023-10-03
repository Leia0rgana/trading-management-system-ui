import styles from './Sidebar.module.css'
import { BiArchive } from 'react-icons/bi'
const sidebarData = [
  {
    title: 'Архив сделок',
    icon: <BiArchive />,
    link: '/archive',
  },
  {
    title: 'Домой',
    icon: <BiArchive />,
    link: '/',
  },
  {
    title: 'Контакты',
    icon: <BiArchive />,
    link: '/contacts',
  },
]
export default function Sidebar({ sidebarExpanded }) {
  return (
    <>
      {sidebarExpanded && (
        <div className={styles.sidebar}>
          <ul className={styles.sidebarList}>
            {sidebarData.map((item, key) => {
              return (
                <li
                  key={key}
                  className={`${styles.row} ${
                    window.location.pathname === item.link && styles.active
                  }`}
                  onClick={() => {
                    window.location.pathname = item.link
                  }}
                >
                  <div className={styles.icon}>{item.icon}</div>
                  <div className={styles.title}>{item.title}</div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
