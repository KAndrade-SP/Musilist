import { User } from '../../types/UserTypes'
import { useToggleWithOutsideClick } from '../../hooks/useToggle'
import { useState } from 'react'
import {
  Divider,
  SettingsSectionTitle,
  SettingsContainer,
  SettingsContent,
  Tab,
  TabContent,
  TabItem,
  SettingsDropdownIcon,
  SettingsDropdown,
  SettingsDropdownItem,
  UploadContent,
  PhotoPreview,
  BannerPreview,
  UploadLabel,
  UploadTitle,
} from './Settings.styles'
import { tabs } from '../../types/SettingsLinks'
import { IconAdjustmentsAlt, IconX } from '@tabler/icons-react'
import { useTheme } from 'styled-components'
import UploadImage from '../../components/UploadImage/UploadImage'

const SettingsPage = ({ user }: { user: User | null }) => {
  const theme = useTheme()
  const { toggle, ref, handleClick } = useToggleWithOutsideClick()
  const [activeTab, setActiveTab] = useState('Profile')
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [bannerError, setBannerError] = useState<string | null>(null)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handlePhotoError = (message: string | null) => {
    setPhotoError(message)
  }

  const handleBannerError = (message: string | null) => {
    setBannerError(message)
  }

  return (
    <SettingsContainer>
      <SettingsSectionTitle>
        <h2>Settings</h2>
        <Tab>
          {tabs.map(tab => (
            <TabItem key={tab} className={tab === activeTab ? 'active' : ''} onClick={() => handleTabClick(tab)}>
              {tab}
            </TabItem>
          ))}
        </Tab>
        <SettingsDropdownIcon role="button" aria-label="toggle settings dropdown icons" onClick={handleClick}>
          {!toggle ? (
            <IconAdjustmentsAlt
              size={30}
              style={{
                color: theme.colors.textWhite,
                cursor: 'pointer',
              }}
            />
          ) : (
            <IconX
              size={30}
              style={{
                color: theme.colors.textWhite,
                cursor: 'pointer',
              }}
            />
          )}
        </SettingsDropdownIcon>
      </SettingsSectionTitle>

      {toggle && (
        <SettingsDropdown ref={ref} role="menu" aria-label="settings dropdown" onClick={handleClick}>
          {tabs.map(tab => (
            <SettingsDropdownItem
              key={tab}
              className={tab === activeTab ? 'active' : ''}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </SettingsDropdownItem>
          ))}
        </SettingsDropdown>
      )}

      <Divider />

      <SettingsContent>
        <TabContent>
          {activeTab === 'Profile' && (
            <>
              <UploadTitle>Avatar</UploadTitle>
              <UploadLabel>
                {photoError ? (
                  <span style={{ color: theme.colors.magentaRed }}>{photoError}</span>
                ) : (
                  'Allowed Formats: JPEG, PNG. Max size: 8MB.'
                )}
              </UploadLabel>
              <UploadContent>
                <UploadImage type="profile" onError={handlePhotoError} />
                <PhotoPreview src={user?.photoURL} />
              </UploadContent>

              <UploadTitle>Banner</UploadTitle>
              <UploadLabel>
                {bannerError ? (
                  <span style={{ color: theme.colors.magentaRed }}>{bannerError}</span>
                ) : (
                  'Allowed Formats: JPEG, PNG. Max size: 8MB.'
                )}
              </UploadLabel>
              <UploadContent>
                <UploadImage type="banner" onError={handleBannerError} />
                {user?.coverPhotoURL && <BannerPreview src={user?.coverPhotoURL} />}
              </UploadContent>
            </>
          )}
        </TabContent>
      </SettingsContent>
    </SettingsContainer>
  )
}

export default SettingsPage
