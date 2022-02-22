import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import $ from "jquery";

export const Nav = ({ navItem }) => {
  const router = useRouter();
  const [opc, setOpc] = useState(false);

  const headnavmulti = (e) =>{
    e.preventDefault()
    //if(!opc){
		$('.header-nav li a').parent().siblings('li').find('a').removeClass('active');
		$('.header-nav li a').parent().find('ul').toggleClass('active');
	//	setOpc(true);
  //  }else{
	//	$('.header-nav li a').parent().find('ul').removeClass('active');
	//	setOpc(false)
  //  }
  }
  
  const isActive=(uri)=>{
if(uri === router.pathname) return "active";
		//return lvl===2&&uri === router.pathname ? "active";
  }
  

  return (
    <ul className='header-nav'>
      {navItem.map((nav) => (
        <li key={nav.path}>
          <Link href={nav.path}>
            <a className={isActive(nav.path)} onClick={nav.path==="#" && headnavmulti } >
              {nav.name}
            </a>
          </Link>
          {nav.subNav && (
            <ul className={isActive("#")}>
              {nav.subNav.map((sub) => (
                <li key={sub.path}>
                  <Link href={sub.path}>
                    <a className={isActive(sub.path)}>{sub.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
