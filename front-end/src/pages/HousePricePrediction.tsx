import { Text, Paper, Title } from '@mantine/core';
import HousePricePredictionForm from '../components/HousePricePredictionForm';

export default function HousePricePrediction() {
  return (
    <Paper shadow="xs" p="xl">
      <Title order={2}>House price prediction</Title>
      
      <Text size="lg" ta="left">
        <strong>Goal:</strong> predict median housing prices based on various features such as location, number of rooms, and more.
      </Text>
      
      <Text size="lg" ta="left">
        <strong>Type of task:</strong> regression problem.
      </Text>
      
      <Text size="lg" ta="left">
        <strong>Performance Measure:</strong> RMSE - Root Mean Square Error, a typical performance measure for regression tasks. Corresponds to the Euclidean norm, the notion of distance called the ℓ2 norm, noted ∥ · ∥2 (or just ∥ · ∥). RMSE is more sensitive to outliers than the MAE.
      </Text>
      
      <Text size="lg" ta="left">
        <strong>Selected model:</strong> Experimented with linear regression, decision tree and random forest model (which was slowest but best performing model)
      </Text>
      
      <Text size="lg" ta="left">
        <strong>Results:</strong> 	With Final RMSE for value 41,448.08, confidence interval is [39,293.29, 43,496.26] with 95% confidence.
      </Text>
      
      <Text size="lg" ta="left">
        <strong>Infrastructure:</strong> 	Model is running in AWS lambda, and accessible via API gateway endpoint.
      </Text>

      <HousePricePredictionForm />


    </Paper>
  );
}