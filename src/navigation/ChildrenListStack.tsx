import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChildrenListScreen from '../screens/children/ChildrenListScreen';
import ChildrenRegisterScreen from '../screens/children/ChildrenRegisterScreen';
import ChildrenInfoPlaylistScreen from '../screens/children/ChildrenInfoPlaylistScreen';
import ChildrenInfoReactionRegisterScreen from '../screens/children/ChildrenInfoReactionRegisterScreen';
import ChildrenInfoReactionScreen from '../screens/children/ChildrenInfoReactionScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import { getUserData } from '../utils/Store';
import axios from 'axios';
import {API_URL} from '@env';

const Stack = createNativeStackNavigator();

interface Child {
  id: number;
  name: string;
  birthdate: string;
  image: string;
  age: number;
}

export default function HomeStack({ navigation, route }: any) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedChild, setSelectedChild] = React.useState<Child | null>(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEdit = () => {
    setMenuVisible(false);
    if (selectedChild) {
      navigation.navigate('ChildrenRegister', { child: selectedChild });
    }
  };

  const handleDelete = async () => {
    setMenuVisible(false);

    try {
      const token = await getUserData();
      if (selectedChild) {
        await axios.delete(`${API_URL}/api/kid/${selectedChild.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Alert.alert('삭제 완료');
        navigation.navigate('ChildrenList', { refresh: true });
      }
      
    } catch (error) {
      console.error('Error kid delete:', error);
    }
    
  };

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "ChildrenList" || routeName === "ChildrenInfoPlaylist" || routeName === undefined) {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChildrenList"
        component={ChildrenListScreen}
        options={{
          title: '아이 목록',
          headerTitleStyle: {
            fontFamily: 'SCDream5',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChildrenRegister"
        component={ChildrenRegisterScreen}
        options={{
          title: '아이 등록',
          headerTitleStyle: {
            fontFamily: 'SCDream5',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChildrenInfoPlaylist"
        options={{
          title: '',
          headerRight: () => (
            <Menu
              visible={menuVisible}
              onDismiss={toggleMenu}
              anchor={
                <TouchableOpacity onPress={toggleMenu}>
                  <Icon name="ellipsis-vertical" size={24} color="#000" />
                </TouchableOpacity>
              }
            >
              <Menu.Item onPress={() => handleEdit()} title="수정" />
              <Menu.Item onPress={handleDelete} title="삭제" />
              <Divider />
              <Menu.Item onPress={toggleMenu} title="취소" />
            </Menu>
          ),
        }}
      >
        {(props: any) => (
          <ChildrenInfoPlaylistScreen
            {...props}
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ChildrenInfoReaction"
        component={ChildrenInfoReactionScreen}
        options={{
          title: '자장가 반응 목록',
          headerTitleStyle: {
            fontFamily: 'SCDream5',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChildrenInfoReactionRegister"
        component={ChildrenInfoReactionRegisterScreen}
        options={{
          title: '자장가 반응 작성',
          headerTitleStyle: {
            fontFamily: 'SCDream5',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};