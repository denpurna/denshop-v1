import { MostViewed } from 'components/shared/MostViewed/MostViewed';
import { ProductDetails } from 'components/Product/ProductDetails/ProductDetails';
import {
  getDoc,
  getDocs,
  collection,
  doc
} from "firebase/firestore";
import {
dbFS
} from "components/firebase";

const { PublicLayout } = require('layout/PublicLayout');

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Shop',
    path: '/shop',
  },
  {
    label: 'Product',
    path: '/product',
  },
];
const ProductPage = ({products_Data}) => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Shop'>
      <ProductDetails products_Data={products_Data} />
      <MostViewed products_Data={products_Data} />
    </PublicLayout>
  );
};


export const getServerSideProps = async ()=> {
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

export default ProductPage;
