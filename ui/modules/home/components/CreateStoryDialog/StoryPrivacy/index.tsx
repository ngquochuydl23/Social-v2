import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, Switch, SwitchProps } from "@mui/material";
import styles from './storyPrivacy.module.scss';
import { useIntl } from "react-intl";
import { IcFollowerAudience, IcHideAudience, IcPrivateAudience, IcPublicAudience } from "@assets/icons";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import _ from "lodash";
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useTheme } from "next-themes";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => {
  const { theme } = useTheme();
  return ({
    width: 40,
    height: 22,
    zIndex: 10,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 1,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "20px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: "var(--SwitchDarkLight)",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 20,
      height: 20,
    },
    "& .MuiSwitch-track": {
      borderRadius: 20 / 2,
      backgroundColor: theme === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
    },
  })
});

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
  paddingX: theme.spacing(2),
  // borderBottom: '1px solid var(--BorderColor)',
  // border: 'none',
  backgroundColor: 'var(--BgPrimaryColor)',
}));

const collections = new Array<any>(7).fill({});

interface StoryPrivacyProps {
  onChange: (turnOffCommenting: boolean, audienceType: string) => any;
}

const StoryPrivacy: React.FC<StoryPrivacyProps> = ({ onChange }) => {
  const intl = useIntl();
  const [expanded, setExpanded] = useState([true, false]);
  const [turnOffCommt, setTurnOffCmmt] = useState(false);
  const [audienceType, setAudienceType] = useState('public');
  const [collection, setCollection] = useState();

  useEffect(() => {
    const storyPrivacyLayout = document.getElementById('storyPrivacyLayout');
    const fixedHeight = storyPrivacyLayout?.offsetHeight

    if (storyPrivacyLayout && fixedHeight) {
      storyPrivacyLayout.style.maxHeight = `${fixedHeight}px`
    }
  }, [])

  const handleChange = (idx: number) => {
    expanded[idx] = !expanded[idx]
    setExpanded([...expanded]);
  };

  const chooseAudienceType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _audienceType = (event.target as HTMLInputElement).value;
    setAudienceType(_audienceType);
  };

  useEffect(() => {
    onChange(turnOffCommt, audienceType);
  }, [turnOffCommt, audienceType])


  return (
    <div
      id="storyPrivacyLayout"
      className={styles.storyPrivacy}>
      <Accordion expanded={expanded[0]} onChange={() => handleChange(0)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className={styles.privacyItem}>
            <span className={styles.title}>
              {intl.formatMessage({ id: "Audience" })}
            </span>
            <p> {intl.formatMessage({ id: "Who can see your story?" })}</p>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingY: 0, paddingBottom: '10px' }}>
          <FormControl>
            <RadioGroup
              onChange={chooseAudienceType}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group">
              <Stack direction="column">
                <FormControlLabel
                  value={"public"}
                  control={<Radio checked={audienceType === 'public'} />}
                  label={
                    <div className={styles.audienceType}>
                      <IcPublicAudience />
                      <h4 className={styles.title}> {intl.formatMessage({ id: "Public" })}</h4>
                    </div>
                  } />
                <FormControlLabel
                  value={"followers"}
                  control={<Radio checked={audienceType === 'followers'} />}
                  label={
                    <div className={styles.audienceType}>
                      <IcFollowerAudience />
                      <h4 className={styles.title}> {intl.formatMessage({ id: "Followers" })}</h4>
                    </div>
                  } />
                <FormControlLabel
                  value={"private"}
                  control={<Radio checked={audienceType === 'private'} />}
                  label={
                    <div className={styles.audienceType}>
                      <IcPrivateAudience />
                      <h4 className={styles.title}>{intl.formatMessage({ id: "Private" })}</h4>
                    </div>
                  } />
                <FormControlLabel
                  value={"hideFroms"}
                  control={<Radio checked={audienceType === 'hideFroms'} />}
                  label={
                    <div className={styles.audienceType} style={{ alignItems: 'f' }}>
                      <IcHideAudience />
                      <h4 className={styles.title}>{intl.formatMessage({ id: "Hide Froms" })}</h4>
                    </div>
                  } />
              </Stack>
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <div className={styles.turnOfCommenting}>
        <div className={styles.privacyItem}>
          <span className={styles.title}>
            {intl.formatMessage({ id: "Turn off Commenting" })}
          </span>
          <p> {intl.formatMessage({ id: "Currently of for all stories." })}</p>

        </div>
        <IOSSwitch
          checked={turnOffCommt}
          onChange={() => {
            setTurnOffCmmt(!turnOffCommt);
            // turnOffNotification(device.id!!, { turnOff: !_turnOffNotification })
            //   .catch((err) => {
            //     setTurnOffNotifcation(!_turnOffNotification);
            //     console.log(err)
            //   })
          }}
        />
      </div>
      <Accordion expanded={expanded[1]} onChange={() => handleChange(1)}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <div className={styles.privacyItem}>
            <span className={styles.title}>
              {intl.formatMessage({ id: "Save to your collection" })}
            </span>
            <p> {intl.formatMessage({ id: "Select your collection (Optional)" })}</p>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingY: 0, paddingBottom: '10px' }}>
          <Grid container spacing="10px">
            {_.map(collections, (item: any) => (
              <Grid item md={2.4}>
                <div className={styles.collection}>
                  <img
                    alt="story-thumbnai"
                    src="https://www.social-v2.com/images/social-v2-1686040819948.jpeg"
                  />
                  <div className={styles.onImage}>
                    <div className={styles.wrapper}>
                      <p className={styles.name}>Chicago</p>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default StoryPrivacy;