import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { BiArchive } from 'react-icons/bi'

const sidebarData = [
  {
    title: 'Архив сделок',
    icon: <BiArchive />,
    link: 'archive',
  },
  {
    title: 'Домой',
    icon: <BiArchive />,
    link: '',
  },
  {
    title: 'Контакты',
    icon: <BiArchive />,
    link: 'contacts',
  },
]

export default function Sidebar({
  sidebarExpanded,
  onSidebarItemSelect,
  selectedSidebarItem,
}) {
  return (
    <>
      {sidebarExpanded && (
        <div className={styles.sidebar}>
          <ul className={styles.sidebarList}>
            {sidebarData.map((item, key) => {
              return (
                <Link
                  to={item.link}
                  key={key}
                  className={`${styles.row} ${
                    `/${item.link}` === selectedSidebarItem && styles.active
                  }`}
                  onClick={() => onSidebarItemSelect(`/${item.link}`)}
                >
                  <div className={styles.icon}>{item.icon}</div>
                  <div className={styles.title}>{item.title} </div>
                </Link>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
