import { View, Text, TouchableOpacity } from 'react-native';
import { IProduct } from '../interface/IProduct';
import { ShoppingCart } from 'lucide-react-native';
import { RandomFoodIcon } from './RandomFoodIcon';
import { excerptString } from '../utils/excerptString';

export function ProductCard(props: Partial<IProduct> & { onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      className='mb-2 w-full flex-row items-center justify-between rounded-lg border border-black px-4 py-2'
    >
      <RandomFoodIcon className='mr-2' />

      <View className='flex-1'>
        <Text className='text-xl font-bold'>
          {props.titulo}
        </Text>

        <Text className='text-lg'>
          {excerptString(props.descricao, 25, 24)}
        </Text>

        <Text className='font-bold'>
          R${props.preco.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      <ShoppingCart color='black'/>
    </TouchableOpacity>
  );
}
