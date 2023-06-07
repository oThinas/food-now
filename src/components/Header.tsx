import { ReactNode } from 'react';
import { View, Text } from 'react-native';

interface IHeaderProps {
  content: ReactNode;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
}

export function Header(props: IHeaderProps) {
  return (
    <View className='flex-row items-center'>
      {props.leftAction}

      <Text className='flex-1 text-center text-2xl font-bold'>
        {props.content}
      </Text>

      {props.rightAction}
    </View>
  );
}
