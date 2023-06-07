import { useLocalSearchParams, useRouter } from 'expo-router';
import { Angry, ChevronLeft, PlusCircle, Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

import { Input } from '../../src/components/Input';
import { RestaurantCard } from '../../src/components/RestaurantCard';
import { IResutaurant } from '../../src/interface/IRestaurant';
import { api } from '../../src/lib/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header } from '../../src/components/Header';

export default function Restaurants() {
  const router = useRouter();
  const user = useLocalSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [restaurantList, setRestaurantList] = useState<IResutaurant[]>([]);
  const hasRestaurant = restaurantList.length > 0;

  async function getRestaurants() {
    try {
      const response = await api.get('/restaurante');
      const { content } = response.data;

      return content;
    } catch (error) {
      console.log(error);
    }
  }

  function handleRedirect(restaurant: IResutaurant) {
    router.push({ pathname: `/restaurants/${restaurant.id}`, params: { ...restaurant } });
  }

  function handleAddRestaurant() {
    router.push({ pathname: '/restaurants/addRestaurant' });
  }

  useEffect(() => {
    (async () => {
      if (!inputValue) {
        return setRestaurantList(await getRestaurants());
      }

      setRestaurantList(restaurantList.filter((item) => item.nome.toLowerCase().includes(inputValue.trim().toLowerCase())));
    })();
  }, [inputValue]);

  useEffect(() => {
    (async () => {
      setRestaurantList(await getRestaurants());
    })();
  }, []);

  return (
    <View className='flex-1 bg-zinc-100 p-8'>
      <Header
        leftAction={
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color='black'/>
          </TouchableOpacity>
        }
        content={
          <>
          Olá,{' '}
            <Text className='text-primary'>
              {user.nome}
            </Text>
          </>
        }
        rightAction={
          <TouchableOpacity onPress={() => handleAddRestaurant()}>
            <PlusCircle color='black'/>
          </TouchableOpacity>
        }
      />

      <View className='flex-1 pt-4'>
        <Input
          rightIcon={<Search color='black' />}
          value={inputValue}
          onChangeText={(value) => setInputValue(value)}
          className='text-base'
        />

        <Text className='mt-2 text-lg font-medium'>
          Escolha um restaurante abaixo
        </Text>

        <SafeAreaView className={`py-4 ${!hasRestaurant ? 'flex-1 justify-center' : ''}`}>
          {hasRestaurant ? (
            <FlatList
              data={restaurantList}
              renderItem={({ item }) => (
                <RestaurantCard {...item} onPress={() => handleRedirect(item)}/>
              )}
            />
          ) : (
            <View className='items-center'>
              <Angry color='black' size={64}/>

              <Text className='text-center text-xl font-bold'>
              Nenhum restaurante encontrado
              </Text>
            </View>
          )}
        </SafeAreaView>
      </View>
    </View>
  );
}
