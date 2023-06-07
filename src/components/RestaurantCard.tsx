import { ChevronRight } from 'lucide-react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import { IResutaurant } from '../interface/IRestaurant';

export function RestaurantCard(props: Partial<IResutaurant> & { onPress: () => void }) {
  const ratingStyle = props.nota >= 4.5 ? 'text-green-600'
    : 3.5 <= props.nota && props.nota < 4.5 ? 'text-yellow-600'
      : 'text-red-600';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      className='mb-2 w-full flex-row items-center rounded-lg border border-black px-4 py-2'
    >
      <View className='flex-1'>
        <Text className='text-xl font-bold'>
          {props.nome}
        </Text>

        <Text className='text-lg'>
          {props.descricao}
        </Text>

        <Text className={`font-bold ${ratingStyle}`}>
          {props.nota.toFixed(1)}/5
        </Text>
      </View>

      <ChevronRight color='black' />
    </TouchableOpacity>
  );
}
