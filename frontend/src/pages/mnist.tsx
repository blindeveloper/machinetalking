import { Text, Paper, Title } from '@mantine/core';

export default function Mnist() {
  return (
    <Paper shadow="xs" p="xl">
      <Title order={2}>Classification with MNIST</Title>
      
      <Text size="lg" ta="left" pb="xs">
        <strong>MNIST</strong> is set of 70,000 small images 
        of digits handwritten by high school students and employees 
        of the US Census Bureau. Each image is labeled with the digit it represents.
      </Text>
      <Text  size="lg" ta="left" pb="xs">
        There are 70,000 images, and each image has 784 features. 
        This is because each image is 28 × 28 pixels, 
        and each feature simply represents one pixel’s intensity, 
        from 0 (white) to 255 (black).
      </Text>

    </Paper>
  );
}