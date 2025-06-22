import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type FormData from '../types/FormData';
import { getInitialFormState } from '../utils/formHelper';

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(getInitialFormState());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const type = (target as HTMLInputElement).type;

    if (type === 'checkbox') {
      const input = target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        hobbies: input.checked
          ? [...prev.hobbies, value]
          : prev.hobbies.filter(h => h !== value),
      }));
    } else if (type === 'file') {
      const input = target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        file: input.files ? input.files[0] : null,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Simple Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Hobbies</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                name="hobbies"
                value="Reading"
                checked={formData.hobbies.includes('Reading')}
                onChange={handleChange}
              />
            }
            label="Reading"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="hobbies"
                value="Traveling"
                checked={formData.hobbies.includes('Traveling')}
                onChange={handleChange}
              />
            }
            label="Traveling"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="hobbies"
                value="Gaming"
                checked={formData.hobbies.includes('Gaming')}
                onChange={handleChange}
              />
            }
            label="Gaming"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            name="country"
            value={formData.country}
            label="Country"
            onChange={handleChange}
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="Mexico">Mexico</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Bio"
          name="bio"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={formData.bio}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FormPage;
