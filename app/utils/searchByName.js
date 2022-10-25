export default function searchByName(guests, text) {
  text = text.toLowerCase();
  return guests.filter((guest) => guest.name.toLowerCase().includes(text));
}
