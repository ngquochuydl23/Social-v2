import React, { useEffect, useState } from "react";
import styles from './securityAndPrivacy.module.scss';
import SettingField from '../components/SettingField';
import classNames from "classnames";
import { useIntl } from 'react-intl';
import ChangePasswordDialog from "../components/ChangePasswordDialog";
import { hideEmail } from "utils/EmailUtils";
import { hidePhone } from "utils/PhoneUtils";
import { getSecurityAndPrivacy } from "services/SettingService";
import { SecurityAndPrivacyDto } from "services/SettingService/dtos";
import SettingLayout from "../components/SettingLayout";
import Lottie from "lottie-react";
import { LoadingMore } from '@assets/lotties';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import SettingHeader from "../components/SettingHeader";
import { Button, FilledButton } from "@components/Button";
import AddNewPhoneDialog from "../components/AddNewPhoneDialog";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `none`
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  padding: 0,
  borderBottom: '1px solid var(--BorderColor)',
  backgroundColor: 'var(--BgPrimaryColor)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: 0,
  },
  '&:before': {
    top: 0,
    marginLeft: 0
  },
  border: 'none',
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  //borderBottom: '1px solid var(--BorderColor)',
  // border: 'none',
  backgroundColor: 'var(--BgPrimaryColor)',
}));


const SecurityAndPrivacyPage = () => {
  const intl = useIntl();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openAddPhone, setOpenAddPhone] = useState(false);
  const [data, setData] = useState<SecurityAndPrivacyDto>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSecurityAndPrivacy()
      .then(res => setData(res.result))
      .catch(err => { console.error(err) })
      .finally(() => setLoading(false))
  }, [])

  const [expanded, setExpanded] = React.useState<string | false>();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <SettingLayout>
      {loading
        ? <div className={styles.pageLoading}>
          <div className={styles.lottieLoading}>
            <Lottie
              animationData={LoadingMore}
              loop={true} />
          </div>
        </div>
        : <div>
          <SettingHeader
            title='Security and Privacy'
            subtitle='Manage your account’s security and keep track of your account’s usage including apps that you have connected to your account.'
          />
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <div className={styles.accordSum}>
                <span className={styles.title}>
                  {intl.formatMessage({ id: "Email" })}
                </span>
                <p> {intl.formatMessage({ id: "Please verify your email" })}</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p className={styles.contactType}>{hideEmail(data?.email)}</p>
              {data?.email
                ? data?.verifiedEmail
                  ? <p className={styles.verification}>
                    <span className={classNames(styles.status, styles.unverified)}>{intl.formatMessage({ id: "Verified " })}</span>
                    {intl.formatMessage({ id: "Thank you for verifying your email. " })}<br />
                  </p>
                  : <div>
                    <p className={styles.verification} style={{ marginBottom: '10px'}}>
                      <span className={classNames(styles.status, styles.unverified)}>{intl.formatMessage({ id: "Unverified " })}</span>
                      {intl.formatMessage({ id: "You need to verify your email." })} 1/29/2023. <br />
                    </p>
                    <Button
                      className={styles.btn}
                      text="Confirm your email" />
                  </div>
                : <div>

                </div>
              }
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <div className={styles.accordSum}>
                <span className={styles.title}>
                  {intl.formatMessage({ id: "Phone Number" })}
                </span>
                <p> {intl.formatMessage({ id: "You can change your phone number" })}</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {data?.phoneNumber
                ? data?.verifiedPhoneNumber
                  ? <p className={styles.verification}>
                    <span className={classNames(styles.status, styles.unverified)}>{intl.formatMessage({ id: "Verified " })}</span>
                    {intl.formatMessage({ id: "Thank you for verifying your phone number." })}<br />
                  </p>
                  : <div>
                    <p className={styles.verification}>
                      <span className={classNames(styles.status, styles.unverified)}>{intl.formatMessage({ id: "Unverified " })}</span>
                      {intl.formatMessage({ id: "You need to verify your phone number." })} 1/29/2023. <br />
                    </p>
                    <FilledButton
                      className={styles.btn}
                      text="Confirm your phone number" />
                  </div>
                : <div>
                  <FilledButton
                    onClick={() => setOpenAddPhone(true)}
                    text="Add your phone number"
                    className={styles.btn} />
                </div>
              }
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <div className={styles.accordSum}>
                <span className={styles.title}>
                  {intl.formatMessage({ id: "Password" })}
                </span>
                <p> {intl.formatMessage({ id: "Improve your security with a strong password." })}</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <FilledButton
                text="Change your password"
                onClick={() => setOpenChangePassword(true)}
                className={styles.btn} />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <div className={styles.accordSum}>
                <span className={styles.title}>
                  {intl.formatMessage({ id: "Two-Factor Authentication" })}
                </span>
                <p>{intl.formatMessage({ id: "Add an extra layer of security to your Social account by using your password and a code on your mobile phone to log in." })}</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <FilledButton
                text="Add Two-Factor Authentication"
                className={styles.btn} />
            </AccordionDetails>
          </Accordion>
        </div>
      }
      <ChangePasswordDialog
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)} />
      <AddNewPhoneDialog
        open={openAddPhone}
        onClose={() => setOpenAddPhone(false)}
      />
    </SettingLayout>
  )
}

export default SecurityAndPrivacyPage; 
