import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
    const { auth } = useSelector(({ auth }) => ({ auth: auth }));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    }
    return <Header user={auth} onLogout={onLogout} />;
};

export default HeaderContainer;