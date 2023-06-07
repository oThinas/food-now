import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import { ChevronLeft, Trash2, Pencil, ShoppingCart } from 'lucide-react-native';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Header } from '../../../src/components/Header';
import { RandomFoodIcon } from '../../../src/components/RandomFoodIcon';
import { api } from '../../../src/lib/api';
import { useState } from 'react';
import { Field } from '../../../src/components/Field';
import { Button } from '../../../src/components/Button';

export default function ProductId() {
  const router = useRouter();
  const product = useLocalSearchParams();
  const pathname = usePathname();

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(product.titulo as string);
  const [description, setDescription] = useState(product.descricao as string);
  const [price, setPrice] = useState(product.preco as string);

  const [_, __, restaurantId, productId] = pathname.split('/');

  const formattedPrice = Number(price)
    .toFixed(2)
    .replace('.', ',');

  async function handleDeleteProduct() {
    try {
      console.log(productId);
      await api.delete('/produto', { data: { id: productId } });
      router.back();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSaveProduct() {
    const formattedName = name.trim();
    const formattedDescription = description.trim();
    const formattedPrice = price.trim();

    if (!formattedName || !formattedDescription || !formattedPrice) {
      return;
    } else if (Number.isNaN(Number(formattedPrice))) {
      return;
    }

    try {
      await api.put('/produto', {
        id: productId,
        titulo: formattedName,
        descricao: formattedDescription,
        preco: formattedPrice,
      });

      setIsEditMode(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleBuyProduct() {
    router.push({ pathname: '/order', params: { restaurantId, productId } });
  }

  return (
    <KeyboardAvoidingView className='flex-1' behavior='padding'>
      <View className='flex-1 bg-zinc-100 p-8'>
        <Header
          leftAction={
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft color='black'/>
            </TouchableOpacity>
          }
          content={
            <Text className='mb-2 text-2xl font-bold text-primary'>
              {name}
            </Text>
          }
        />

        <View className='mb-4 mt-2 rounded-lg border border-black px-4 py-2'>
          <View className='mb-2 items-center self-center'>
            <RandomFoodIcon size={64}/>

            <Text className='text-center text-xl font-bold'>
              {name}
            </Text>

            <Text className='text-center text-lg'>
              {description}
            </Text>

            <Text className='text-center font-bold'>
              R${formattedPrice}
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <TouchableOpacity onPress={() => handleDeleteProduct()}>
              <Trash2 color='#dc2626'/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsEditMode(true)}>
              <Pencil color='black'/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleBuyProduct()}>
              <ShoppingCart color='black'/>
            </TouchableOpacity>
          </View>
        </View>

        {isEditMode && (
          <ScrollView>
            <Field label='Nome' value={name} onChangeText={(value) => setName(value)} customClassname='mb-2'/>

            <Field label='Descrição' value={description} onChangeText={(value) => setDescription(value)} customClassname='mb-2'/>

            <Field label='Preço' keyboardType='numeric' value={price} onChangeText={(value) => setPrice(value)} customClassname='mb-2'/>

            <Button onPress={() => handleSaveProduct()}>
              <Text className='text-lg font-medium text-white'>
                Salvar
              </Text>
            </Button>
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
