import React from 'react'
import { Tab, Tabs } from '@material-ui/core'
import { useRouter } from 'next/router'

const TABS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Favorites',
    href: '/favorites',
  },
]

interface NavBarProps {
  activeTab: string
}

const NavBar: React.FC<NavBarProps> = ({ activeTab }) => {
  const router = useRouter()
  return (
    <Tabs
      value={activeTab}
      indicatorColor="primary"
      textColor="primary"
      onChange={(_e, value) => router.push(value)}
    >
      {TABS.map((tab) => (
        <Tab label={tab.label} value={tab.href} />
      ))}
    </Tabs>
  )
}

export default NavBar
