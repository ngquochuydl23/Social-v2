import { IcClose } from '@assets/icons';
import { Breakpoint, Dialog, styled } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';
import styles from './dialog.module.scss'

export interface DialogProps {
  children?: React.ReactElement;
  open: boolean
  isPadding?: boolean
  onClose: () => any;
  scroll?: 'body' | 'paper';
  maxWidth?: Breakpoint | false;
  fullScreen?: boolean;
  showBaseHeader?: boolean;
  backdropBg?: string;
  dialogHeaderProps?: BaseDialogHeaderProps;
}

export interface BaseDialogHeaderProps {
  onButtonClose?: () => any;
  text: string;
  textRightButton?: string;
  rightButtonClick?: () => any;
  disableRightButton?: boolean;
}


export const BaseDialogHeader: React.FC<BaseDialogHeaderProps> = ({
  onButtonClose, text, textRightButton, rightButtonClick, disableRightButton = false
}) => {
  const intl = useIntl();
  return (
    <div className={styles.baseDialogHeader}>
      <div
        className={styles.icClose}
        onClick={onButtonClose}>
        <IcClose />
      </div>
      <p className={styles.headerTitle}>
        {intl.formatMessage({ id: text })}
      </p>
      {textRightButton &&
        <p
          className={classNames(styles.textRightButton, disableRightButton && styles.disable)}
          onClick={() => {
            if (rightButtonClick && !disableRightButton)
              rightButtonClick();
          }}>
          {intl.formatMessage({ id: textRightButton })}
        </p>
      }
    </div>
  )
}

const SocialDialog = styled(Dialog)``;

const BaseDialog: React.FC<DialogProps> = ({
  children,
  open,
  onClose,
  scroll = 'paper',
  maxWidth = 'sm',
  fullScreen = false,
  dialogHeaderProps,
  showBaseHeader = true,
  backdropBg
}) => {
  const [fullWidth, setFullWidth] = React.useState(true);
  return (
    <React.Fragment>
      <SocialDialog
        PaperProps={{
          style: {
            borderRadius: !isMobile ? '20px' : '0px',
            backgroundColor: 'var(--BgPrimaryColor)'
          }
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'var(--BackdropDiaglog)'
          }
        }}
        style={{
          zIndex: 12000,
          paddingRight: !isMobile ? '17px' : '0px',
        }}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        open={open}
        scroll={scroll}
        onClose={onClose}>
        {showBaseHeader &&
          <BaseDialogHeader
            textRightButton={dialogHeaderProps?.textRightButton}
            rightButtonClick={dialogHeaderProps?.rightButtonClick}
            onButtonClose={dialogHeaderProps?.onButtonClose || onClose}
            text={dialogHeaderProps?.text!} />
        }
        <div className={classNames(styles.dialogBody, isMobile && styles.isMobile)}>
          {children}
        </div>
      </SocialDialog>
    </React.Fragment>
  );
}

export default BaseDialog