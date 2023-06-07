import { useLocalSearchParams, useRouter } from 'expo-router';
import { Search, Angry, ChevronLeft, PlusCircle } from 'lucide-react-native';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input } from '../../../src/components/Input';
import { useEffect, useState } from 'react';
import { IProduct } from '../../../src/interface/IProduct';
import { api } from '../../../src/lib/api';
import { ProductCard } from '../../../src/components/ProductCard';
import { Header } from '../../../src/components/Header';

export default function RestaurantId() {
  const router = useRouter();
  const restaurant = useLocalSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [productList, setProductList] = useState<IProduct[]>([]);
  const hasProduct = productList.length > 0;

  async function getProducts() {
    try {
      const response = await api.get('/produto');
      const { content } = response.data;

      return content;
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddProduct() {
    router.push({ pathname: `/restaurants/${restaurant.id}/addProduct` });
  }

  function handleRedirect(product: IProduct) {
    router.push({ pathname: `/restaurants/${restaurant.id}/${product.id}`, params: { ...product } });
  }

  useEffect(() => {
    (async () => {
      if (!inputValue) {
        return setProductList(await getProducts());
      }

      setProductList(productList.filter((item) => item.titulo.toLowerCase().includes(inputValue.trim().toLowerCase())));
    })();
  }, [inputValue]);

  useEffect(() => {
    (async () => {
      setProductList(await getProducts());
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
          <Text className='mb-2 text-2xl font-bold text-primary'>
            {restaurant.nome}
          </Text>
        }
        rightAction={
          <TouchableOpacity onPress={() => handleAddProduct()}>
            <PlusCircle color='black'/>
          </TouchableOpacity>
        }
      />

      <View className='mt-4'>
        <Input
          rightIcon={<Search color='black' />}
          value={inputValue}
          onChangeText={(value) => setInputValue(value)}
        />
      </View>

      <Text className='mt-2 text-lg font-medium'>
        Escolha um produto abaixo
      </Text>

      <SafeAreaView className={`py-4 ${!hasProduct ? 'flex-1 justify-center' : ''}`}>
        {hasProduct ? (
          <FlatList
            data={productList}
            renderItem={({ item }) => (
              <ProductCard {...item} onPress={() => handleRedirect(item)}/>
            )}
          />
        ) : (
          <View className='items-center'>
            <Angry color='black' size={64}/>

            <Text className='text-center text-xl font-bold'>
              Nenhum produto encontrado
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
