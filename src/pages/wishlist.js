import { MostViewed } from 'components/shared/MostViewed/MostViewed';
import { Wishlist } from 'components/Wishlist/Wishlist';
import { PublicLayout } from 'layout/PublicLayout';
import {
  getDocs,
  collection
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
    label: 'Wishlist',
    path: '/wishlist',
  },
];
const WishlistPage = ({products_Data}) => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Wishlist'>
      <Wishlist products_Data={products_Data} />
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

export default WishlistPage;
