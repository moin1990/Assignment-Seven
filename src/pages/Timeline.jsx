import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone, faComment, faVideo, faHandshake,
  faChevronDown, faMagnifyingGlass, faArrowUpShortWide, faArrowDownShortWide
} from '@fortawesome/free-solid-svg-icons';
import { useTimeline } from '../context/TimelineContext';

const TYPE_CONFIG = {
  call:   { label: 'Call',   icon: faPhone,      iconBg: 'bg-gray-100',  iconColor: 'text-gray-600'  },
  text:   { label: 'Text',   icon: faComment,    iconBg: 'bg-gray-100',  iconColor: 'text-gray-600'  },
  video:  { label: 'Video',  icon: faVideo,      iconBg: 'bg-gray-100',  iconColor: 'text-gray-600'  },
  meetup: { label: 'Meetup', icon: faHandshake,  iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
};

const FILTER_OPTIONS = ['All', 'Call', 'Text', 'Video', 'Meetup'];

function TimelineEntry({ entry }) {
  const config = TYPE_CONFIG[entry.type] ?? TYPE_CONFIG.text;
  const { icon, label, iconBg, iconColor } = config;

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl border border-gray-200 px-4 py-3.5 hover:border-gray-300 transition-colors">
      <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <FontAwesomeIcon icon={icon} className={`text-sm ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{label}</span>
          <span className="text-gray-500"> with {entry.friendName}</span>
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const { timeline } = useTimeline();
  const [filter, setFilter]   = useState('All');
  const [search, setSearch]   = useState('');
  const [sortOld, setSortOld] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const filtered = useMemo(() => {
    let entries = [...timeline];
    if (filter !== 'All') {
      entries = entries.filter((e) => e.type === filter.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      entries = entries.filter(
        (e) => e.friendName.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)
      );
    }
    entries.sort((a, b) => {
      const diff = new Date(b.date) - new Date(a.date);
      return sortOld ? -diff : diff;
    });
    return entries;
  }, [timeline, filter, search, sortOld]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Timeline</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Filter dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-2 border border-gray-300 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors min-w-[170px] justify-between"
          >
            <span>{filter === 'All' ? 'Filter timeline' : filter}</span>
            <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
          </button>
          {dropOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 min-w-[170px]">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setFilter(opt); setDropOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    filter === opt
                      ? 'bg-[#f0f5f2] text-[#2d5a4e] font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search by name or type…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm outline-none
                       focus:border-[#2d5a4e] focus:ring-1 focus:ring-[#2d5a4e] bg-white"
          />
        </div>

        {/* Sort toggle */}
        <button
          onClick={() => setSortOld(!sortOld)}
          className="border border-gray-300 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <FontAwesomeIcon icon={sortOld ? faArrowUpShortWide : faArrowDownShortWide} className="text-gray-500" />
          {sortOld ? 'Oldest first' : 'Newest first'}
        </button>
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No entries match your filter.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((entry) => (
            <TimelineEntry key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
