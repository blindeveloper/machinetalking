import { Button, Group} from '@mantine/core';

function ContactForm() {
  return (
    <form 
      action="mailto:blindeveloper@gmail.com"
      method="POST"
      encType="text/plain">

      <Group justify="flex-end" mt="md">
        <Button type="submit" variant="filled" color="teal">Contact us</Button>
      </Group>
      
    </form>
  );
}

export default ContactForm;