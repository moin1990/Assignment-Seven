import { useNavigate } from 'react-router-dom';

export function getStatusStyle(status) {
  switch (status) {
    case 'overdue':    return 'bg-red-500 text-white';
    case 'almost due': return 'bg-amber-400 text-white';
    case 'on-track':   return 'bg-[#2d5a4e] text-white';
    default:           return 'bg-gray-200 text-gray-600';
  }
}

export function getStatusLabel(status) {
  switch (status) {
    case 'overdue':    return 'Overdue';
    case 'almost due': return 'Almost Due';
    case 'on-track':   return 'On-Track';
    default:           return status;
  }
}

export default function FriendCard({ friend }) {
  const navigate = useNavigate();

  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=2d5a4e&color=fff&size=150`;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/friend/${friend.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-2xl p-5 flex flex-col items-center gap-2.5 cursor-pointer
                 border border-gray-200 hover:shadow-md hover:border-[#b8d4cc] transition-all duration-200
                 animate-fade-up"
    >
      {/* Avatar */}
      <img
        src={friend.picture}
        alt={`${friend.name}'s avatar`}
        className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow"
        onError={(e) => { e.currentTarget.src = fallback; }}
      />

      {/* Name */}
      <h3 className="font-semibold text-gray-900 text-sm text-center leading-snug">
        {friend.name}
      </h3>

      {/* Days ago */}
      <p className="text-gray-400 text-xs">{friend.days_since_contact}d ago</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 justify-center">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className="bg-green-100 text-[#2d5a4e] text-[10px] font-bold uppercase
                       tracking-wide px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status */}
      <span
        className={`text-[11px] font-bold px-3 py-1 rounded-full ${getStatusStyle(friend.status)}`}
      >
        {getStatusLabel(friend.status)}
      </span>
    </article>
  );
}
