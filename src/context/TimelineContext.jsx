import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext(null);

const initialTimeline = [
  { id: 1,  type: 'meetup', friendName: 'Tom Baker',       date: '2026-04-12' },
  { id: 2,  type: 'text',   friendName: 'Sarah Chen',      date: '2026-04-10' },
  { id: 3,  type: 'meetup', friendName: 'Olivia Martinez', date: '2026-04-08' },
  { id: 4,  type: 'video',  friendName: 'Aisha Patel',     date: '2026-04-06' },
  { id: 5,  type: 'meetup', friendName: 'Sarah Chen',      date: '2026-04-03' },
  { id: 6,  type: 'call',   friendName: 'Marcus Johnson',  date: '2026-04-01' },
  { id: 7,  type: 'meetup', friendName: 'Aisha Patel',     date: '2026-03-29' },
  { id: 8,  type: 'text',   friendName: 'Olivia Martinez', date: '2026-03-25' },
  { id: 9,  type: 'call',   friendName: 'Lisa Nakamura',   date: '2026-03-22' },
  { id: 10, type: 'call',   friendName: 'Sarah Chen',      date: '2026-03-20' },
  { id: 11, type: 'video',  friendName: 'Marcus Johnson',  date: '2026-03-18' },
  { id: 12, type: 'video',  friendName: "Ryan O'Brien",    date: '2026-03-16' },
];

export function TimelineProvider({ children }) {
  const [timeline, setTimeline] = useState(initialTimeline);

  const addEntry = (entry) => {
    setTimeline((prev) => [entry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ timeline, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error('useTimeline must be used within TimelineProvider');
  return ctx;
}
