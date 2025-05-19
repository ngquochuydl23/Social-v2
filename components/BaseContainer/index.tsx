import { Badge, Container, CssBaseline } from '@mui/material';
import classNames from 'classnames';
import styles from './baseContainer.module.scss'

interface BaseContainerProps {
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  maxWidth?: any;
}

const BaseContainer: React.FC<BaseContainerProps> = ({
  className, children, fullWidth = false, maxWidth = "lg"
}) => {
  return (
    <>
      <CssBaseline />
      {fullWidth ?
        <div className={classNames(
          styles.baseContainer,
          styles.fullWidth,
          className
        )}>
          {children}
        </div>
        : <Container
          maxWidth={maxWidth || 'lg'}
          className={classNames(styles.baseContainer, className)}>
          {children}
        </Container>
      }
    </>
  )
}

export default BaseContainer;