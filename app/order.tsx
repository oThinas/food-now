/* eslint-disable camelcase */
import { ChevronLeft } from 'lucide-react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import { Header } from '../src/components/Header';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../src/lib/api';
import { IResutaurant } from '../src/interface/IRestaurant';
import { useEffect, useState } from 'react';
import { IProduct } from '../src/interface/IProduct';
import { IOrder } from '../src/interface/IOrder';

export default function Order() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { productId, restaurantId } = params;

  const [restaurant, setRestaurant] = useState<IResutaurant>(null);
  const [product, setProduct] = useState<IProduct>(null);
  const [order, setOrder] = useState<IOrder>(null);

  async function fetchData() {
    try {
      let response = await api.get('/restaurante');
      const { content: restaurants } = response.data;
      setRestaurant(restaurants.find((restaurant: IResutaurant) => String(restaurant.id) === restaurantId));

      response = await api.get('/produto');
      const { content: products } = response.data;
      setProduct(products.find((product: any) => String(product.id) === productId));

      response = await api.get('/pedidos');
      const { content: orders } = response.data;
      setOrder(orders.find((order: any) => String(order.produto_id) === productId && String(order.restaurante_id) === restaurantId));

      if (!order) {
        response = await api.post('/pedidos', {
          consumidor_id: 1,
          restaurante_id: restaurantId,
          produto_id: productId,
          endereco: {
            rua: 'Rua doutor albuquerque lins',
            complemento: 'próximo a banca',
            bairro: 'santa cecilia',
            estado: 'SP',
            cidade: 'São paulo',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
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
          <Text className='mb-2 text-2xl font-bold text-primary'>
            Pedido: {order?.id || 'Carregando...'}
          </Text>
        }
      />

      <View className='mb-4 mt-2 rounded-lg border border-black px-4 py-2'>
        <View className='mb-2 items-center self-center'>
          <Text className='text-center text-xl font-bold'>
            {restaurant?.nome || 'Carregando...'}
          </Text>

          <Text className='text-center text-lg'>
            {product?.titulo || 'Carregando...'}
          </Text>

          <Text className={`text-center font-bold ${order?.status === 'PENDENTE' ? 'text-yellow-600' : ''}`}>
            {order?.status || 'Carregando...'}
          </Text>
        </View>
      </View>
    </View>
  );
}
