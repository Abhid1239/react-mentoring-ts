import { Outlet } from 'react-router-dom';
import MainHeader from '../components/Navigation/MainHeader';
import { Provider } from 'react-redux';
import store from '../store/store';
import SessionProvider from '../store/StoreProvider';

export default function Root() {
  return (
    <SessionProvider>
      <Provider store={store}>
        <MainHeader />
        <Outlet />
      </Provider>
    </SessionProvider>
  );
}
