import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { Shop } from 'components/Shop/Shop';
import { PublicLayout } from 'layout/PublicLayout';
import {
  getDoc,
  getDocs,
  collection,
  doc
} from "firebase/firestore";
import {
dbFS
} from "components/firebase";

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Shop',
    path: '/shop',
  },
];
const ShopPage = ({products_Data}) => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Shop'>
      <Shop products_Data={products_Data} />
      <Subscribe />
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
    const products_Data=docs_Products;
  return {
    props: {
      products_Data,
    },
  };
}

export default ShopPage;
