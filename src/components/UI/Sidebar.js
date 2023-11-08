import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { BiArchive, BiHomeAlt2, BiLinkExternal } from 'react-icons/bi'

const sidebarData = [
  {
    title: 'Главная',
    icon: <BiHomeAlt2 />,
    link: '',
  },
  {
    title: 'Архив сделок',
    icon: <BiArchive />,
    link: 'archive',
  },
  {
    title: 'Контакты',
    icon: <BiLinkExternal />,
    link: 'contacts',
  },
]

export default function Sidebar({ sidebarExpanded }) {
  return (
    <>
      <div
        className={`${styles.sidebar} ${
          sidebarExpanded ? styles.expanded : styles.closed
        }`}
      >
        <ul className={styles.sidebarList}>
          {sidebarData.map((item, key) => {
            return (
              <NavLink to={item.link} key={key} className={styles.row}>
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.title}>{item.title} </div>
              </NavLink>
            )
          })}
        </ul>
      </div>
    </>
  )
}
