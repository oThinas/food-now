import { ChevronLeft } from 'lucide-react-native';
import { KeyboardAvoidingView, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Field } from '../../../src/components/Field';
import { Button } from '../../../src/components/Button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { api } from '../../../src/lib/api';
import { Header } from '../../../src/components/Header';

export default function AddProduct() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  async function handleAddProduct() {
    console.log('chegou aqui');
    const formattedName = title.trim();
    const formattedDesc = desc.trim();
    const formattedPrice = price.trim();
    const formattedAmount = amount.trim();

    if (!formattedName) {
      showError('O campo nome é obrigatório');
      return;
    } else if (!formattedDesc) {
      showError('O campo descrição é obrigatório');
      return;
    } else if (!formattedPrice) {
      showError('O campo preço é obrigatório');
      return;
    } else if (Number.isNaN(Number(formattedPrice))) {
      showError('O campo preço deve conter apenas números');
      return;
    } else if (!formattedAmount) {
      showError('O campo quantidade é obrigatório');
      return;
    } else if (Number.isNaN(Number(formattedAmount))) {
      showError('O campo quantidade deve conter apenas números');
      return;
    }

    try {
      await api.post('/produto', {
        titulo: title,
        descricao: desc,
        preco: price,
        estoque: amount,
      }).then(() => router.back());
    } catch (error) {
      showError('Ocorreu um erro ao adicionar o produto');
      console.log(error);
    }
  }

  function showError(message: string) {
    setError(message);
    setTimeout(() => setError(''), 2000);
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
            <>
              Adicionando{' '}

              <Text className='text-primary'>
                produto
              </Text>
            </>
          }
        />

        <ScrollView contentContainerStyle={{ paddingVertical: 32 }}>
          {error && (
            <Text className='w-full text-center text-lg font-medium text-red-600'>
              {error}
            </Text>
          )}

          <Field label='Nome' value={title} onChangeText={(value) => setTitle(value)} customClassname='mb-4'/>

          <Field label='Descrição' value={desc} onChangeText={(value) => setDesc(value)} customClassname='mb-4'/>

          <Field label='Preço' keyboardType='numeric' value={price} onChangeText={(value) => setPrice(value)} customClassname='mb-4'/>

          <Field label='Disponível' keyboardType='numeric' value={amount} onChangeText={(value) => setAmount(value)} customClassname='mb-4'/>

          <Button onPress={() => handleAddProduct()}>
            <Text className='text-lg font-medium text-white'>
              Adicionar
            </Text>
          </Button>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
