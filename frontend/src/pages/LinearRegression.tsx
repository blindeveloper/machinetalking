import { Text, Paper, Title } from '@mantine/core';

export default function Mnist() {
  const submitPrediction_v2 = () => {
  const payload = {
    numerical_value: 234
  };

  fetch('https://q790y4een3.execute-api.eu-central-1.amazonaws.com/lin_reg/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  return (
    <Paper shadow="xs" p="xl">
      <Title order={2}>Linear Regression</Title>

      <Text size="lg" ta="left" pb="xs">
        <strong>Linear Regression</strong> is a linear approach to modeling the relationship between a scalar response and one or more explanatory variables (or features).
      </Text>

      <button onClick={submitPrediction_v2}>Submit v2</button>

    </Paper>
  );
}