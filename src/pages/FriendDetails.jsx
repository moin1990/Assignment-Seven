import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone, faComment, faVideo,
  faBell, faBoxArchive, faTrash,
  faPencil, faArrowLeft, faXmark
} from '@fortawesome/free-solid-svg-icons';
import friendsData from '../data/friends.json';
import { useTimeline } from '../context/TimelineContext';
import { useToast } from '../context/ToastContext';
import { getStatusStyle, getStatusLabel } from '../components/FriendCard';

function StatCard({ value, label }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center flex-1">
      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

export default function FriendDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();
  const { addToast } = useToast();

  const friend = friendsData.find((f) => String(f.id) === id);
  const [goalDays, setGoalDays] = useState(friend?.goal ?? 30);
  const [editingGoal, setEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(goalDays);

  if (!friend) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 px-4">
        <p className="text-2xl font-bold text-gray-800">Friend not found</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-[#2d5a4e] hover:underline flex items-center gap-1.5"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> Back to home
        </button>
      </div>
    );
  }

  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=2d5a4e&color=fff&size=150`;

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleCheckIn = (type) => {
    const labels = { call: 'Call', text: 'Text', video: 'Video' };
    const today = new Date().toISOString().split('T')[0];
    addEntry({ id: Date.now(), type, friendName: friend.name, date: today });
    addToast(`${labels[type]} with ${friend.name} logged to Timeline!`, type);
  };

  const saveGoal = () => {
    const val = parseInt(tempGoal, 10);
    if (!isNaN(val) && val > 0) setGoalDays(val);
    setEditingGoal(false);
  };

  const checkInButtons = [
    { type: 'call',  label: 'Call',  icon: faPhone   },
    { type: 'text',  label: 'Text',  icon: faComment  },
    { type: 'video', label: 'Video', icon: faVideo    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Back link */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> Back to friends
      </button>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-3 w-full lg:w-[260px] flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center gap-3 text-center">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-white shadow"
              onError={(e) => { e.currentTarget.src = fallback; }}
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">{friend.name}</h1>
              <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${getStatusStyle(friend.status)}`}>
                  {getStatusLabel(friend.status)}
                </span>
                {friend.tags.map((tag) => (
                  <span key={tag} className="bg-green-100 text-[#2d5a4e] text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 italic">"{friend.bio}"</p>
            <p className="text-xs text-gray-400">Preferred: {friend.preferred_contact}</p>
          </div>

          <button className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
            <FontAwesomeIcon icon={faBell} className="text-gray-400 text-xs" /> Snooze 2 Weeks
          </button>
          <button className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
            <FontAwesomeIcon icon={faBoxArchive} className="text-gray-400 text-xs" /> Archive
          </button>
          <button className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm text-red-500 hover:bg-red-50 flex items-center justify-center gap-2 transition-colors">
            <FontAwesomeIcon icon={faTrash} className="text-xs" /> Delete
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col sm:flex-row gap-3">
            <StatCard value={friend.days_since_contact}    label="Days Since Contact" />
            <StatCard value={goalDays}                     label="Goal (Days)"        />
            <StatCard value={formatDate(friend.next_due_date)} label="Next Due"      />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Relationship Goal</h2>
              <button
                onClick={() => { setTempGoal(goalDays); setEditingGoal(true); }}
                className="text-xs font-medium border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <FontAwesomeIcon icon={faPencil} className="text-[10px]" /> Edit
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Connect every <span className="font-bold text-gray-900">{goalDays} days</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Check-In</h2>
            <div className="grid grid-cols-3 gap-3">
              {checkInButtons.map(({ type, label, icon }) => (
                <button
                  key={type}
                  onClick={() => handleCheckIn(type)}
                  className="flex flex-col items-center gap-2.5 py-4 rounded-xl border border-gray-200
                             hover:bg-[#f0f5f2] hover:border-[#b8d4cc] transition-all text-sm font-medium text-gray-700"
                >
                  <FontAwesomeIcon icon={icon} className="text-xl text-gray-600" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Goal Modal */}
      {editingGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setEditingGoal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Edit Goal</h3>
              <button onClick={() => setEditingGoal(false)} className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <label className="text-sm text-gray-600 block mb-1">Contact every (days)</label>
            <input
              type="number" min="1" value={tempGoal}
              onChange={(e) => setTempGoal(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2d5a4e] focus:ring-1 focus:ring-[#2d5a4e] mb-4"
            />
            <button onClick={saveGoal} className="w-full bg-[#2d5a4e] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#1e3a32] transition-colors">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
