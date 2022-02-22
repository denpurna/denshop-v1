import { Advantage } from 'components/shared/Advantage/Advantage';
import { Banner } from 'components/landing/Banner/Banner';
import { BrandLogo } from 'components/shared/BrandLogo/BrandLogo';
import { Discount } from 'components/landing/Discount/Discount';
import { Info } from 'components/landing/Info/Info';
import { LatestNews } from 'components/landing/LatestNews/LatestNews';
import { NewArrivals } from 'components/landing/NewArrivals/NewArrivals';
import { TopCategories } from 'components/landing/TopCategories/TopCategories';
import { Trending } from 'components/landing/Trending/Trending';
import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { Layout } from 'layout/Layout';
import {
  getDoc,
  getDocs,
  collection,
  doc
} from "firebase/firestore";
import {
dbFS
} from "components/firebase";
import {
  getCookies,
getCookie,
setCookies,
removeCookies,
checkCookies
} from 'cookies-next';

export default function Home({products_Data}) {
  return (
    <Layout>
      <Banner />
      <Trending />
      <BrandLogo />
      <Discount />
      <Advantage />
      <TopCategories />
      <Info />
      <NewArrivals products_Data={products_Data} />
      <LatestNews />
      <Subscribe />
    </Layout>
  );
}

export const getServerSideProps = async ({req, res})=> {
  if(!checkCookies("banner_data",{req, res})){
  const q = doc(dbFS,
                  "Backend",
                  "Landing",
                  "Banner",
                  "pMzh5aQcjFaDeMzVRGdo"
                  );
    const docs = await getDoc(q);
    const datanya=JSON.stringify(docs.data());
    setCookies("banner_data",datanya,{req, res})
  }
  const docs_Products = [];
  const qProducts = collection(dbFS,
                  "__products"
                  );
    const docs_Product = await getDocs(qProducts);
    docs_Product.forEach((gets)=>{
     //let arrGet=gets.data()?gets.data():{};
     docs_Products.push(gets.data());
    })
    const products_Data=JSON.stringify(docs_Products);
  return {
    props: {
      products_Data,
    },
  };
}
