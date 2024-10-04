import { InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordFieldProps {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  error?: boolean;
  helperText?: string | false;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
}

const PasswordInput = ({id='password', name='password', label='Password', value, error, helperText, onChange, onBlur}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel
        htmlFor={id}
        error={error}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onPaste={(e) => e.preventDefault()}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {error && (
        <FormHelperText error={true}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordInput;
