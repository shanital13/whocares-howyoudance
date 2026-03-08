import { DanceClass, Profile, Registration, PunchCard, Payment, Attendance } from './types';

export const mockClasses: DanceClass[] = [
  {
    id: '1',
    name: 'שחרור גוף ונשמה',
    level: 'all',
    location: 'סטודיו חיפה, רח\' הנמל 12',
    date: '2026-03-12',
    time: '18:00',
    is_recurring: true,
    recurring_day: 4,
    max_participants: 15,
    created_at: '2026-01-01',
  },
  {
    id: '2',
    name: 'ריקוד חופשי',
    level: 'beginner',
    location: 'מרכז קהילתי, תל אביב',
    date: '2026-03-14',
    time: '19:30',
    is_recurring: true,
    recurring_day: 6,
    max_participants: 20,
    created_at: '2026-01-01',
  },
  {
    id: '3',
    name: 'תנועה אותנטית',
    level: 'intermediate',
    location: 'סטודיו חיפה, רח\' הנמל 12',
    date: '2026-03-15',
    time: '10:00',
    is_recurring: false,
    created_at: '2026-02-01',
  },
  {
    id: '4',
    name: 'ריקוד אקסטטי',
    level: 'advanced',
    location: 'חוף הים, הרצליה',
    date: '2026-03-20',
    time: '17:00',
    is_recurring: false,
    max_participants: 30,
    created_at: '2026-02-15',
  },
];

export const mockProfiles: Profile[] = [
  { id: 'u1', full_name: 'נועה כהן', email: 'noa@example.com', created_at: '2026-01-15' },
  { id: 'u2', full_name: 'מיכל לוי', email: 'michal@example.com', created_at: '2026-01-20' },
  { id: 'u3', full_name: 'שירה אברהם', email: 'shira@example.com', created_at: '2026-02-01' },
  { id: 'u4', full_name: 'יעל דוד', email: 'yael@example.com', created_at: '2026-02-10' },
  { id: 'u5', full_name: 'רונית מזרחי', email: 'ronit@example.com', created_at: '2026-02-20' },
];

export const mockPunchCards: PunchCard[] = [
  { id: 'pc1', user_id: 'u1', entries_remaining: 3, is_active: true, created_at: '2026-02-01' },
  { id: 'pc2', user_id: 'u3', entries_remaining: 1, is_active: true, created_at: '2026-02-15' },
  { id: 'pc3', user_id: 'u5', entries_remaining: 0, is_active: false, created_at: '2026-01-10' },
];

export const mockRegistrations: Registration[] = [
  { id: 'r1', user_id: 'u1', class_id: '1', entry_type: 'punch_card', created_at: '2026-03-10' },
  { id: 'r2', user_id: 'u2', class_id: '1', entry_type: 'single', created_at: '2026-03-10' },
  { id: 'r3', user_id: 'u3', class_id: '1', entry_type: 'punch_card', created_at: '2026-03-11' },
  { id: 'r4', user_id: 'u4', class_id: '2', entry_type: 'single', created_at: '2026-03-12' },
  { id: 'r5', user_id: 'u1', class_id: '2', entry_type: 'punch_card', created_at: '2026-03-12' },
];

export const mockPayments: Payment[] = [
  { id: 'p1', user_id: 'u1', amount: 1800, payment_type: 'punch_card', created_at: '2026-02-01' },
  { id: 'p2', user_id: 'u2', amount: 500, payment_type: 'single', class_id: '1', created_at: '2026-03-10' },
  { id: 'p3', user_id: 'u3', amount: 1800, payment_type: 'punch_card', created_at: '2026-02-15' },
  { id: 'p4', user_id: 'u4', amount: 500, payment_type: 'single', class_id: '2', created_at: '2026-03-12' },
  { id: 'p5', user_id: 'u5', amount: 500, payment_type: 'single', class_id: '1', created_at: '2026-03-01' },
  { id: 'p6', user_id: 'u2', amount: 500, payment_type: 'single', class_id: '3', created_at: '2026-02-20' },
];

export const mockAttendance: Attendance[] = [
  { id: 'a1', user_id: 'u1', class_id: '1', attended: true, marked_at: '2026-03-05' },
  { id: 'a2', user_id: 'u2', class_id: '1', attended: true, marked_at: '2026-03-05' },
  { id: 'a3', user_id: 'u3', class_id: '1', attended: false },
];
