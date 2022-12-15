export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

export const options = [
  {
    label: "Sangeet",
    value: "Sangeet",
  },
  {
    label: "Haldi",
    value: "Haldi",
  },
  {
    label: "Wedding",
    value: "Wedding",
  },
  {
    label: "Mehendi",
    value: "Mehendi",
  },
  {
    label: "Engagement",
    value: "Engagement",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export const events = [
  {
    _id: { $oid: "6335c1b2c30ef952bf3b0223" },
    customEvent: "Blah blah",
    date: "25th October, 2022",
    time: "18:00",
    venue: "Raj Maidan, Darbhanga",
    hostId: { $oid: "6331e2d26c86f5a57f12be59" },
    __v: { $numberInt: "0" },
    createdAt: { $date: { $numberLong: "1664467378531" } },
    updatedAt: { $date: { $numberLong: "1664467378531" } },
  },
  {
    _id: { $oid: "6335c1b2c30ef952bf3b0224" },
    customEvent: "Love love",
    date: "26th October, 2022",
    time: "18:00",
    venue: "Raj Maidan, Darbhanga",
    hostId: { $oid: "6331e2d26c86f5a57f12be59" },
    __v: { $numberInt: "0" },
    createdAt: { $date: { $numberLong: "1664467378531" } },
    updatedAt: { $date: { $numberLong: "1664467378531" } },
  },
  {
    _id: { $oid: "6335c8c854cdb0d2f6ee82d6" },
    customEvent: "Tilak",
    date: "27th October, 2022",
    time: "20:00",
    venue: "Raj Maidan, Darbhanga",
    hostId: { $oid: "6331e2d26c86f5a57f12be59" },
    createdAt: { $date: { $numberLong: "1664469192166" } },
    updatedAt: { $date: { $numberLong: "1664470328196" } },
    __v: { $numberInt: "0" },
  },
];

export const guests = [
  {
    _id: { $oid: "6336aa9d713069da0354b172" },
    name: "Kamal Jain",
    mobile: "9876543210",
    email: "kamal@gmail.com",
    isInvited: false,
    hostId: { $oid: "6331e2d26c86f5a57f12be59" },
    createdAt: { $date: { $numberLong: "1664527005048" } },
    updatedAt: { $date: { $numberLong: "1664527005048" } },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "6336abc2713069da0354b17a" },
    name: "Aman",
    mobile: "9988776655",
    email: "aman@gmail.com",
    isInvited: false,
    hostId: { $oid: "6331e2d26c86f5a57f12be59" },
    __v: { $numberInt: "0" },
    createdAt: { $date: { $numberLong: "1664527298064" } },
    updatedAt: { $date: { $numberLong: "1664527298064" } },
  },
  {
    _id: { $oid: "6336ac1d713069da0354b182" },
    name: "Chaman",
    mobile: "9988776655",
    email: "chaman@gmail.com",
    isInvited: false,
    hostId: { $oid: "6331e2d26c86f5a57f12be59" },
    __v: { $numberInt: "0" },
    createdAt: { $date: { $numberLong: "1664527389583" } },
    updatedAt: { $date: { $numberLong: "1664527389583" } },
  },
];
