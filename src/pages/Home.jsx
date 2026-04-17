import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import friendsData from '../data/friends.json';
import FriendCard from '../components/FriendCard';
import LoadingSpinner from '../components/LoadingSpinner';

function SummaryCard({ value, label }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center flex-1 min-w-[130px]">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const totalFriends          = friends.length;
  const onTrack               = friends.filter((f) => f.status === 'on-track').length;
  const needAttention         = friends.filter((f) => f.status === 'overdue' || f.status === 'almost due').length;
  const interactionsThisMonth = 12;

  return (
    <div>
      {/* Banner */}
      <section className="bg-[#f0f5f2] pt-12 pb-10 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight max-w-lg mx-auto">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the
          relationships that matter most.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 inline-flex items-center gap-2 bg-[#2d5a4e] hover:bg-[#1e3a32]
                     text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          Add a Friend
        </button>

        {/* Summary cards */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          <SummaryCard value={totalFriends}           label="Total Friends"           />
          <SummaryCard value={onTrack}                label="On Track"                />
          <SummaryCard value={needAttention}          label="Need Attention"          />
          <SummaryCard value={interactionsThisMonth}  label="Interactions This Month" />
        </div>
      </section>

      {/* Friends Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Your Friends</h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>

      {/* Add Friend Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add a Friend</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              This feature is coming soon. Stay tuned!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-[#2d5a4e] text-white text-sm font-semibold py-2.5 rounded-xl
                         hover:bg-[#1e3a32] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
