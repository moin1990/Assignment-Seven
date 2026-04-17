import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center gap-4">
      <p className="text-8xl font-bold text-[#2d5a4e] opacity-20">404</p>
      <h1 className="text-2xl font-bold text-gray-900 -mt-4">Page not found</h1>
      <p className="text-gray-500 text-sm max-w-xs">
        The page you're looking for doesn't exist. Maybe it moved, or you mistyped the URL.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-2 inline-flex items-center gap-2 bg-[#2d5a4e] hover:bg-[#1e3a32] text-white
                   text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
      >
        <FontAwesomeIcon icon={faHouse} /> Go home
      </button>
    </div>
  );
}
