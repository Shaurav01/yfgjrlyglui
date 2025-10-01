import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ✅ API Base URL from .env
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`${API_BASE}/user/${listing.userRef}`);
        const data = await res.json();

        if (!res.ok) {
          console.error(data.message || 'Failed to fetch landlord');
          setLoading(false);
          return;
        }

        setLandlord(data);
      } catch (error) {
        console.error('Error fetching landlord:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  if (loading) return <p>Loading contact info...</p>;

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{' '}
            for{' '}
            <span className="font-semibold">
              {listing.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=${encodeURIComponent(
              'Regarding ' + listing.name
            )}&body=${encodeURIComponent(message)}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
