import { Login } from 'components/Login/Login';
import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Log In Admin',
    path: '/admin/login',
  },
];
const LoginPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Log In Admin'>
      <Login />
      <Subscribe />
    </PublicLayout>
  );
};

export default LoginPage;
