import { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function Button(props: TouchableOpacityProps & { children: ReactNode }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='w-4/5 flex-row items-center justify-center self-center rounded-lg bg-primary py-4'
      {...props}
    >
      {props.children}
    </TouchableOpacity>
  );
}
