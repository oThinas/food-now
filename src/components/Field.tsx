import { View, Text, TextInputProps } from 'react-native';
import { Input } from './Input';

interface IFieldProps {
  label: string;
  leftIcon?: any;
  rightIcon?: any;
  customClassname?: string;
}

export function Field(props: IFieldProps & TextInputProps) {
  return (
    <View className={`w-full ${props.customClassname}`}>
      <Text className='mb-2 text-lg font-bold'>{props.label}</Text>
      <Input {...props}/>
    </View>
  );
}
