import { ClientId } from '@constants/googleAuthSettings';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import styles from './googleButton.module.scss';
import { IcGoogle } from '@assets/icons';

interface GoogleAuthButtonProps {
  onGetAccessToken: (accessToken: string) => any;
  onErr: (err: any) => any;
}

const InsideGoogleButton: React.FC<GoogleAuthButtonProps> = ({
  onGetAccessToken, onErr
}) => {
  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: codeResponse => {
      onGetAccessToken(codeResponse.access_token);
    },
    onError: onErr
  });
  return (
    <button
      className={styles.googleButton}
      onClick={() => googleLogin()}>
      <IcGoogle />
      <p>
        Continue With Google
      </p>
    </button >
  )
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onGetAccessToken, onErr
}) => {
  return (
    <GoogleOAuthProvider clientId={ClientId}>
      <InsideGoogleButton
        onGetAccessToken={onGetAccessToken}
        onErr={onErr}
      />
    </GoogleOAuthProvider>
  )
}

export default GoogleAuthButton;