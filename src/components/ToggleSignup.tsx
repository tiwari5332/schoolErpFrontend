import { useNavigate } from 'react-router-dom';
import ROUTES from '../router/RouterConstant';

const ToggleSingupLogin = ({ isLogin=true }: { isLogin: boolean }) => {
  const navigate = useNavigate();

  return <div className="text-center pt-4 border-t border-slate-200">
    <p className="text-sm text-slate-600">
      {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
      <button
        type="button"
        onClick={() => navigate(isLogin ? ROUTES.SIGNUP : ROUTES.LOGIN)}
        className="text-indigo-600 hover:text-indigo-700 font-medium"
      >
        {isLogin ? 'Sign up' : 'Sign in'}
      </button>
    </p>
  </div>
}

export default ToggleSingupLogin