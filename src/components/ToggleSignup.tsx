import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

interface ToggleSignupLoginProps {
  isLogin?: boolean;
}

const ToggleSingupLogin = ({ isLogin = true }: ToggleSignupLoginProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-4 border-t border-slate-200">
      <p className="text-xs sm:text-sm text-slate-600">
        {isLogin ? "Don't have a registered school?" : "Already have a school account?"}{' '}
        <button
          type="button"
          onClick={() => navigate(isLogin ? ROUTES.SIGNUP : ROUTES.LOGIN)}
          className="text-indigo-600 hover:text-indigo-700 font-semibold underline-offset-2 hover:underline"
        >
          {isLogin ? 'Onboard your school' : 'Sign in here'}
        </button>
      </p>
    </div>
  );
};

export default ToggleSingupLogin