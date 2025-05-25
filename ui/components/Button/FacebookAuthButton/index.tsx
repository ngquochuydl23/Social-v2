import styles from './facebookButton.module.scss';
import { IcFacebook } from '@assets/icons';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FacebookAppId } from '@constants/facebookAuthSettings';


interface FacebookAuthButtonProps {
  onGetUserInfo: (userInfo: ReactFacebookLoginInfo) => any;
  onErr: (err: any) => any;
}

const FacebookAuthButton: React.FC<FacebookAuthButtonProps> = ({
  onGetUserInfo, onErr
}) => {
  return (
    <FacebookLogin
      appId={FacebookAppId}
      fields="name,email,picture"
      scope="public_profile,user_friends,user_actions.books"
      callback={onGetUserInfo}
      render={renderProps => (
        <button
          className={styles.facebookButton}
          onClick={renderProps.onClick}>
          <IcFacebook />
          <p>
            Continue With Facebook
          </p>
        </button >
      )}
    />
  )
}

export default FacebookAuthButton;