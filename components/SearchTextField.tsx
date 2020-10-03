import React from 'react'
import { Icon, InputAdornment, TextField } from '@material-ui/core'
import debounce from 'lodash/debounce'

interface SearchTextFieldProps {
  onChangeText(text: string): void
}

const SearchTextField: React.FC<SearchTextFieldProps> = ({ onChangeText }) => {
  const onChange = React.useCallback(
    debounce((text: string) => {
      onChangeText(text)
    }, 500),
    []
  )
  return (
    <TextField
      variant="filled"
      fullWidth
      label="Search images..."
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchTextField
