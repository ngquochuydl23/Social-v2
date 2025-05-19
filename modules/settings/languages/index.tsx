import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import Stack from '@mui/joy/Stack';
import SettingHeader from "../components/SettingHeader";
import SettingLayout from "../components/SettingLayout";
import _ from "lodash";
import styles from './languages.module.scss';
import { useTranslation } from "context/TranslationHook";
import { updateLanguage } from "services/ClientService";
import { useIntl } from "react-intl";

const appLanguages = [
  {
    languageName: 'English',
    spelling: 'English',
    locale: 'en'
  },
  {
    languageName: 'Tiếng Việt',
    spelling: 'Vietnamese',
    locale: 'vn'
  },
  {
    languageName: '한국인',
    spelling: 'Korean',
    locale: 'ko'
  },
  {
    languageName: '中文',
    spelling: 'Chinese',
    locale: 'zh'
  },
]

const LanguagesPage = () => {
  const intl = useIntl();
  const { locale, setLocale } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = (event.target as HTMLInputElement).value
    setLocale(language);
    updateLanguage(language)
      .then((res) => { })
      .catch((err) => console.log(err))
  };

  return (
    <SettingLayout>
      <SettingHeader
        title='Languages'
        subtitle='Manage which languages are used to personalize your Social-v2 experience.'
      />
      <FormControl sx={{ marginTop: '20px' }}>
        <FormLabel id="demo-radio-buttons-group-label">
          <p className={styles.fromGroupTitle}>{intl.formatMessage({ id: "Choose language" })}</p>
        </FormLabel>
        <RadioGroup
          onChange={handleChange}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group">
          <Stack direction="column">
            {_.map(appLanguages, (item: any, key) => {
              return (
                <FormControlLabel
                  key={key}
                  value={item.spelling}
                  control={<Radio checked={item.locale === locale} />}
                  label={
                    <div className={styles.languageRadioItem}>
                      <h4>{item.languageName}</h4>
                      <p>{item.spelling}</p>
                    </div>
                  } />
              )
            })}
          </Stack>
        </RadioGroup>
      </FormControl>
    </SettingLayout>
  )
}
export default LanguagesPage;
