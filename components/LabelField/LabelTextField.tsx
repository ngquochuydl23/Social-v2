import { IcHidePassword, IcShowPassword } from "@assets/icons";
import { Box, TextField, TextFieldProps } from "@mui/material"
import { useEffect, useState } from "react";
import { sxContainer, sxTextFiedlLabel } from "./labelFieldSx";

interface LabelTextFieldProps {
  endAdornment?: any;
  textFieldProps: TextFieldProps;
  className?: string;
  errorText?: string;
}

const LabelTextField: React.FC<LabelTextFieldProps> = ({
  endAdornment, textFieldProps, className, errorText
}) => {
  const [focus, setFocus] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFocus(Boolean(textFieldProps.autoFocus));
  }, [])

  useEffect(() => {
    if (textFieldProps.disabled) {
      setFocus(false);
    }
    setHasError(Boolean(textFieldProps.error));
  }, [textFieldProps])

  return (
    <Box
      id="textFieldBox"
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
      <Box
        sx={{
          ...sxContainer,
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
          type={
            textFieldProps.type !== 'password'
              ? textFieldProps.type
              : (showPassword ? 'text' : 'password')
          }
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
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center'
          }}
          onClick={() => {
            if (textFieldProps.type === 'password') {
              setShowPassword(!showPassword);
            }
          }}>
          {textFieldProps.type !== 'password'
            ? endAdornment
            : (showPassword ? <IcHidePassword /> : <IcShowPassword />)
          }
        </div>
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
    </Box>
  )
}

export default LabelTextField;
