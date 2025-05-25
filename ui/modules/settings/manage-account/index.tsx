import SettingField from '../components/SettingField';
import CreateUpdateAvatar from '../components/CreateUpdateAvatar'
import CreateUpdateCover from "../components/CreateUpdateCover";
import SettingLayout from '../components/SettingLayout';
import SettingHeader from '../components/SettingHeader';

const ManageAccountPage = () => {
  return (
    <SettingLayout>
      <SettingHeader
        title='Manage Account'
        subtitle='View information about your account, download your data archive, or learn about options to deactivate your account'
      />
      <div style={{ marginTop: '20px' }} />
      <SettingField
        title='Profile Picture'
        subtitle='You can change your avatar here or remove the current avatar.'
        onRightButtonClick={() => { }}>
        <CreateUpdateAvatar />
      </SettingField>
      <SettingField
        title='Profile Cover'
        subtitle='You can change your cover here or remove the current cover.'>
        <CreateUpdateCover />
      </SettingField>
      <SettingField
        title='Bio'
        subtitle='Add a bio to your profile, in under 300 characters'>

      </SettingField>
      <SettingField
        title='Profile Information'
        buttonType='edit'
        subtitle='Change identifying details for your account'>

      </SettingField>
    </SettingLayout>
  )
}

export default ManageAccountPage; 
