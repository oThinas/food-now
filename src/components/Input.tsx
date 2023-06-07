import { TextInput, TextInputProps, View } from 'react-native';

export function Input(props: TextInputProps & { leftIcon?: any; rightIcon?: any }) {
  return (
    <View className='w-full flex-row items-center rounded-lg border border-zinc-700 px-2'>
      {props.leftIcon}
      <TextInput className='mx-2 h-10 flex-1 text-xl' {...props}/>
      {props.rightIcon}
    </View>
  );
}
