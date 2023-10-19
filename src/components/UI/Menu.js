import Sidebar from './Sidebar'
import { useState } from 'react'
import styles from './Menu.module.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { Button } from 'react-bootstrap'

export default function Menu() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(
    window.location.pathname
  )

  const handleClick = (selectedItem) => {
    setSelectedSidebarItem(selectedItem)
    setSidebarExpanded(false)
  }

  return (
    <div className={styles.menu}>
      <IconContext.Provider value={{ color: '#212529', size: '1.5rem' }}>
        <Button
          variant="custom"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
        >
          <AiOutlineMenu />
        </Button>
      </IconContext.Provider>
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        onSidebarItemSelect={handleClick}
        selectedSidebarItem={selectedSidebarItem}
      />
    </div>
  )
}
