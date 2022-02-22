import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/styles.scss';
import $ from "jquery";

export const CartContext = createContext();
const MyApp = ({ Component, pageProps }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const [sLoad, setSLoad] = useState(false);
  
  useEffect(()=>{
		const handleStart = () => setSLoad(true);
    const handleComplete = () => setSLoad(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  
  return (
    <>
    {sLoad ? (<div class="icon-load"></div>):(
    <CartContext.Provider value={{ cart, setCart }}>
      <Component {...pageProps} />
    </CartContext.Provider>
    )}
    </>
  );
};

export default MyApp;
