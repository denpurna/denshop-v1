import { header } from 'data/data.header';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Nav } from './Nav/Nav';
import { navItem } from 'data/data.header';
import { CartContext } from 'pages/_app';
import $ from "jquery";

export const Header = () => {
  const { cart } = useContext(CartContext);
  const [promo, setPromo] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);

  // For Fixed nav
  useEffect(() => {
    $('.js-btn-menu').removeClass('active');
		$('.header-box').removeClass('active');
		$('html').removeClass('scroll-off');
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });

  const isSticky = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 10) {
      setFixedNav(true);
    } else {
      setFixedNav(false);
    }
  };
  
  const js_btn_menu=(e)=>{
    e.preventDefault()
    $('.js-btn-menu').toggleClass('active');
		$('.header-box').toggleClass('active');
		$('html').toggleClass('scroll-off');
  }
  
  return (
    <>
      {/* <!-- BEGIN HEADER --> */}
      <header className='header'>
        {promo && (
          <div className='header-top'>
            <span>30% OFF ON ALL PRODUCTS ENTER CODE: denshop2022</span>
            <i
              onClick={() => setPromo(false)}
              className='header-top-close js-header-top-close icon-close'
            ></i>
          </div>
        )}
        <div className={`header-content ${fixedNav ? 'fixed' : ''}`}>
          <div className='header-logo'>
            <Link href='/'>
              <a>
                <img src={header.logo} alt='' />
              </a>
            </Link>
          </div>
          <div className='header-box'>
            {/* Nav */}
            <Nav navItem={navItem} />
            {/* header options */}
            <ul className='header-options'>
              <li>
                <Link href='/faq'>
                  <a>
                    <i className='icon-search'></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/profile'>
                  <a>
                    <i className='icon-user'></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/wishlist'>
                  <a>
                    <i className='icon-heart'></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/cart'>
                  <a>
                    <i className='icon-cart'></i>
                    <span>{cart.length ?? '0'}</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div onClick={(e)=>js_btn_menu(e)} className='btn-menu js-btn-menu'>
            <span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
          </div>
        </div>
      </header>

      {/* <!-- HEADER EOF   --> */}
    </>
  );
};
