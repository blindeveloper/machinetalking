import { Text, Paper, Title } from '@mantine/core';

export default function Mnist() {
  return (
    <Paper shadow="xs" p="xl">
      <Title order={2}>MNIST</Title>
      
      <Text size="lg" ta="left">
        <strong>Goal:</strong>Build classification model based on the use of MNIST dataset, which is a set of 70,000 small images of digits handwritten by high school students and employees of the US Census Bureau. Each image is labeled with the digit it represents.
      </Text>

    </Paper>
  );
}