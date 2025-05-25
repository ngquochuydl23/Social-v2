import { Box, MenuItem, Popover, Stack, TextField, TextFieldProps, makeStyles } from "@mui/material"
import { sxTextFiedlLabel } from "./labelFieldSx"
import _ from "lodash"
import { useState } from "react"
import codes from 'country-calling-code';
import { useIntl } from "react-intl";
import reactNodeToString from "react-node-to-string"

interface LabelPhoneField {
  textFieldProps: TextFieldProps;
  className?: string;
  errorText?: string;
}


const LabelPhoneField: React.FC<LabelPhoneField> = ({
  textFieldProps, className, errorText
}) => {
  const intl = useIntl();
  const [focusCD, setFocusCD] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [focus, setFocus] = useState(false);
  return (
    <Stack
      direction="row"
      id="textFieldBox"
      spacing="10px"
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}>

      <Box
        sx={{
          borderRadius: '10px',
          backgroundColor: 'var(--AuthTextField)',
          paddingY: '5px',
          height: '45px',
          width: '40%',
          paddingX: '15px ',
          display: 'flex',
          flexDirection: 'row',
          border: (false)
            ? '2px solid var(--ErrorColor)'
            : (focusCD ? '2px solid var(--PrimaryColor)' : 'none'),
        }}>
        <TextField
          id=""
          sx={{
            ...sxTextFiedlLabel,
            position: 'relative',
            fontFamily: 'SVN-PoppinsMedium',
            fontSize: '14px',
            color: "var(--TextPrimaryColor)",
            padding: 0
          }}
          defaultValue={84}
          variant="standard"
          label={intl.formatMessage({ id: "Country code" })}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            style: {
              fontFamily: 'SVN-PoppinsMedium',
              fontSize: '14px',
              padding: 0,
              color: "var(--TextPrimaryColor)",
            },
          }}
          select
          SelectProps={{
            MenuProps: {
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              sx: {
                zIndex: 12000,
                marginLeft: '-15px',
                maxHeight: '400px',
                "&& .Mui-selected": {
                  backgroundColor: "var(--BgSubColor)"
                },
              }
            },
          }}
          type="text"
          onFocus={(event: any) => {
            setFocusCD(true);
          }}
          onBlur={(e) => {
            setFocusCD(false);
          }}>
          {_.map(codes, (item: any) => {
            return <MenuItem
              sx={{
                fontFamily: 'SVN-PoppinsMedium',
                fontSize: '14px',
                paddingY: '5px',
                color: "var(--TextPrimaryColor)",
                backgroundColor: 'var(--BgPrimaryColor)',
                '&:hover': {
                  backgroundColor: 'var(--BgSubColor)',
                },
                '&:active': {
                  backgroundColor: 'var(--BgSubColor)',
                }
              }}
              value={item.countryCodes[0]}>
              {item.isoCode2} +{item.countryCodes[0]}
            </MenuItem>
          })}
        </TextField>
      </Box>
      <Stack direction="column" sx={{ width: '60%' }}>
        <Box
          sx={{
            borderRadius: '10px',
            backgroundColor: 'var(--AuthTextField)',
            paddingY: '5px',
            flex: 1,
            width: '100%',
            height: '45px',
            paddingX: '15px ',
            display: 'flex',
            flexDirection: 'row',
            border: (errorText || hasError)
              ? '2px solid var(--ErrorColor)'
              : (focus ? '2px solid var(--PrimaryColor)' : 'none'),
          }}>
          <TextField
            sx={{
              ...sxTextFiedlLabel,
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "var(--TextPrimaryColor)",
              },
            }}

            variant="standard"
            {...textFieldProps}
            label={intl.formatMessage({ id: reactNodeToString(textFieldProps.label) })}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              style: {
                fontFamily: 'SVN-PoppinsMedium',
                fontSize: '14px',
                color: "var(--TextPrimaryColor)",
                padding: 0
              }
            }}
            type="text"
            onFocus={(e) => {
              setFocus(true);
            }}
            onBlur={(e) => {
              setFocus(false);
              if (textFieldProps.onBlur) {
                textFieldProps.onBlur(e);
              }
            }}
            onError={() => {
              setHasError(true);
            }}
            error={hasError}
          />
        </Box>
        {errorText &&
          <p style={{
            color: 'var(--ErrorColor)',
            fontFamily: 'SVN-PoppinsMedium',
            fontSize: '12px',
            marginLeft: '2.5px',
            lineHeight: '24px'
          }}>{errorText}</p>
        }
      </Stack>
    </Stack >
  )
}

export default LabelPhoneField