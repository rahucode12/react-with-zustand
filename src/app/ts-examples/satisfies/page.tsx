type AllowedColors = 'red' | 'blue' | 'green';

const theme: Record<string, AllowedColors> = {
    button: 'red', // ❌ now you'll get an error
    card: 'blue',
  };;

  typeof theme.button;
  theme['button'] === 'red';
