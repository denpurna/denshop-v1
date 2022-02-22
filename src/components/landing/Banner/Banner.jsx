import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getFirestore,
  query,
  getDocs,
  getDoc,
  collection,
  where,
  addDoc,
  doc
} from "firebase/firestore";
import {auth, 
db, 
dbFS, 
dbFS_lawas,
storage
} from "components/firebase";
import {
getCookies,
getCookie
} from 'cookies-next';
import productData from 'data/product/product';

export const Banner = () => {
  const [data, setData] = useState([]);
  const dataProductJSON = [...productData]
  useEffect(()=>{
    setData(JSON.parse(getCookie("banner_data")))
  },[getCookie("banner_data")]);
    
  return (
    <>
      <div className='main-block load-bg'>
        <div className='wrapper'>
          <div className='main-block__content'>
            <span className='saint-text'>
            {data.banner_slogan}
            </span>
            <h1 className='main-text'>
            {data.banner_title}
            </h1>
            <p>
              {data.banner_deskripsi}
            </p>

            <Link href='/shop'>
              <a className='btn'>Shop now</a>
            </Link>
              
          </div>
        </div>
        <img
          className='main-block__decor'
          src={"/assets/img/"+data.banner_path_img}
          alt=''
        />
      </div>
    </>
  );
};


function importProduct(dataProductJSON){
   try {
    Promise.all(dataProductJSON.map((itm) => dbFS_lawas.collection("__products").add(itm))).then((results) => {
        alert("sukses import")
      }
    );
  } catch (error) {
        alert("Error writing Value: ", error);
      }
      
}