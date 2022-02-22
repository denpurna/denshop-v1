import { Header } from 'components/shared/Header/Header';
import { Insta } from 'components/shared/Insta/Insta';
import { Footer } from 'components/shared/Footer/Footer';
import $ from "jquery";

export const Layout = ({ children }) => {
  
  const btn_content=(e)=>{
    e.preventDefault
    $('.js-btn-menu').removeClass('active');
		$('.header-box').removeClass('active');
		$('html').removeClass('scroll-off');
  }
  
  return (
    <>
      <header className='header'>
        <Header />
      </header>
      <main onClick={(e)=>btn_content(e)} className='content'>
        {children}
        <Insta />
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </>
  );
};
