import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faComment, faVideo, faCircleCheck, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../context/ToastContext';

const ICONS = {
  call:    { icon: faPhone,       cls: 'text-[#2d5a4e]' },
  text:    { icon: faComment,     cls: 'text-blue-500'   },
  video:   { icon: faVideo,       cls: 'text-purple-500' },
  success: { icon: faCircleCheck, cls: 'text-[#2d5a4e]' },
  info:    { icon: faCircleInfo,  cls: 'text-blue-500'   },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-[320px]"
    >
      {toasts.map((toast) => {
        const cfg = ICONS[toast.type] ?? ICONS.success;
        return (
          <div
            key={toast.id}
            className="animate-slide-in bg-white border border-gray-200 rounded-xl shadow-lg
                       px-4 py-3 flex items-start gap-3"
          >
            <FontAwesomeIcon icon={cfg.icon} className={`mt-0.5 flex-shrink-0 ${cfg.cls}`} />
            <p className="text-sm font-medium text-gray-800 flex-1 leading-snug">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5 flex-shrink-0"
              aria-label="Dismiss"
            >
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
