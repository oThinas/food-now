import { LucideProps } from 'lucide-react-native';
import * as RandomIcon from '../@foodIcons';

const icons = Object.keys(RandomIcon).map((key) => RandomIcon[key]);

export function RandomFoodIcon(props: LucideProps & { className?: string }) {
  const Icon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <Icon color='black' {...props}/>
  );
}
