import { User } from '../../types/UserTypes'
import { Container } from '../../components/Container'
import { useToggleWithOutsideClick } from '../../hooks/useToggle'
import { useState } from 'react'
import { Divider, SettingsContainer, SettingsContent, Tab, TabContent, TabItem } from './Settings.styles'
import { tabs } from '../../types/SettingsLinks'

const SettingsPage = ({ user }: { user: User | null }) => {
  const { toggle, ref, handleClick } = useToggleWithOutsideClick()
  const [activeTab, setActiveTab] = useState('Profile')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <SettingsContainer>
      <Container>
        <h2>Settings</h2>
        <Tab>
          {tabs.map(tab => (
            <TabItem key={tab} className={tab === activeTab ? 'active' : ''} onClick={() => handleTabClick(tab)}>
              {tab}
            </TabItem>
          ))}
        </Tab>
      </Container>

      <Divider />

      <SettingsContent>
        <TabContent>
          <h3>{activeTab}</h3>
        </TabContent>
      </SettingsContent>
    </SettingsContainer>
  )
}

export default SettingsPage
