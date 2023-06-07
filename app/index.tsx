import { Text, View, Image, KeyboardAvoidingView } from 'react-native';
import { Chrome } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { api } from '../src/lib/api';
import { IUser } from '../src/interface/IUser';

import logo from '../src/assets/logo.png';
import { Button } from '../src/components/Button';

export default function Home() {
  const router = useRouter();

  async function handleLogin() {
    try {
      const response = await api.get('/consumidor');
      const { content } = response.data;

      const user: IUser = content.find((user: IUser) => user.email === 'thiago@example.com');
      router.push({ pathname: '/restaurants', params: { ...user } });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView className='flex-1' behavior='padding'>
      <View className='flex-1 items-center gap-6 bg-zinc-100 p-8'>
        <Image source={logo} className='h-52 w-52'/>

        <Text className='text-lg font-medium leading-none'>
            Esse app é uma versão em modo de &quot;debug&quot;. O ideal, seria separá-lo para restaurantes e para consumidores.
        </Text>

        <Button onPress={() => handleLogin()}>
          <Text className='text-lg font-medium text-white'>
              Entrar com a Google
          </Text>

          <Chrome color='white' className='ml-2'/>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
