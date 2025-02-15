import { Button, ButtonProps } from '@mantine/core';
import { IconBrandGithub} from '@tabler/icons-react';

export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return (
    <Button leftSection={<IconBrandGithub size={16} color="black" />} variant="default" {...props} />
  );
}