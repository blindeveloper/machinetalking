import { useState } from 'react';
import { Button, Group, Select, NumberInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMantineTheme } from '@mantine/core';


interface HousePricePredictionFormValues {
  longitude: number;
  latitude: number;
  housing_median_age: number;
  total_rooms: number;
  total_bedrooms: number;
  population: number;
  households: number;
  median_income: number;
  ocean_proximity: string;
}


const HousePricePrediction = () => {
  type PredictionResponse = { predicted_price: number };
  
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  
  const theme = useMantineTheme();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      longitude: -121.95,
      latitude: 37.11,
      housing_median_age: 21.0,
      total_rooms: 2387.0,
      total_bedrooms: 357.0,
      population: 913.0,
      households: 341.0,
      median_income: 7.736,
      ocean_proximity: '<1H OCEAN',
    },

    validate: {
      longitude: (value) => value ? null : 'Invalid longitude value',
      latitude: (value) => value ? null : 'Invalid latitude value',
      housing_median_age: (value) => value ? null : 'Invalid housing median age value',
      total_rooms: (value) => value ? null : 'Invalid total rooms value',
      total_bedrooms: (value) => value ? null : 'Invalid total bedrooms value',
      population: (value) => value ? null : 'Invalid population value',
      households: (value) => value ? null : 'Invalid households value',
      median_income: (value) => value ? null : 'Invalid median income value',
      ocean_proximity: (value) => value ? null : 'Invalid ocean proximity value',
    },
  });

  const submitPrediction = (values: HousePricePredictionFormValues) => {
    const payload = {
      longitude: [values.longitude],
      latitude: [values.latitude],
      housing_median_age: [values.housing_median_age],
      total_rooms: [values.total_rooms],
      total_bedrooms: [values.total_bedrooms],
      population: [values.population],
      households: [values.households],
      median_income: [values.median_income],
      ocean_proximity: [values.ocean_proximity],
    };

    fetch('https://q790y4een3.execute-api.eu-central-1.amazonaws.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <form onSubmit={form.onSubmit((values) => submitPrediction(values))}>
        <NumberInput
          withAsterisk
          label="Longitude"
          // description="Longitude"
          placeholder="Longitude"
          key={form.key('longitude')}
          {...form.getInputProps('longitude')}
        />
        <NumberInput
          withAsterisk
          label="Latitude"
          // description="latitude"
          placeholder="latitude"
          key={form.key('latitude')}
          {...form.getInputProps('latitude')}
        />
        <NumberInput
          withAsterisk
          label="Housing median age"
          placeholder="Housing median age"
          key={form.key('housing_median_age')}
          {...form.getInputProps('housing_median_age')}
        />
        
        <NumberInput
          withAsterisk
          label="Total rooms"
          placeholder="Total rooms"
          key={form.key('total_rooms')}
          {...form.getInputProps('total_rooms')}
        />
        
        <NumberInput
          withAsterisk
          label="Total bedrooms"
          placeholder="Total bedrooms"
          key={form.key('total_bedrooms')}
          {...form.getInputProps('total_bedrooms')}
        />
        
        <NumberInput
          withAsterisk
          label="Population"
          placeholder="Population"
          key={form.key('population')}
          {...form.getInputProps('population')}
        />
        
        <NumberInput
          withAsterisk
          label="Households"
          placeholder="Households"
          key={form.key('households')}
          {...form.getInputProps('households')}
        />
        
        <NumberInput
          withAsterisk
          label="Median income"
          placeholder="Median income"
          key={form.key('median_income')}
          {...form.getInputProps('median_income')}
        />
        
        <Select
          withAsterisk
          label="Ocean proximity"
          placeholder="Pick value"
          key={form.key('ocean_proximity')}
          data={['<1H OCEAN', '<2H OCEAN']}
          {...form.getInputProps('ocean_proximity')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>

      <Text 
          style={{backgroundColor: theme.colors.blue[1],color: theme.colors.blue[9]}} 
          size="lg" 
          ta="left" 
          mt="md" 
          p="md">
        <strong>Predicted Price:</strong> {prediction?.predicted_price}
      </Text>
    </>
  );
}

export default HousePricePrediction;