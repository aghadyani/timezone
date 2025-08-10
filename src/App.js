import React, { useState, useEffect } from 'react';

// A curated and expanded list of timezones grouped by a more user-friendly name.
const curatedTimezones = [
  { name: 'United States (New York)', timezone: 'America/New_York' },
  { name: 'United States (Los Angeles)', timezone: 'America/Los_Angeles' },
  { name: 'United Kingdom (London)', timezone: 'Europe/London' },
  { name: 'Germany (Berlin)', timezone: 'Europe/Berlin' },
  { name: 'Japan (Tokyo)', timezone: 'Asia/Tokyo' },
  { name: 'China (Shanghai)', timezone: 'Asia/Shanghai' },
  { name: 'India (Kolkata)', timezone: 'Asia/Kolkata' },
  { name: 'Australia (Sydney)', timezone: 'Australia/Sydney' },
  { name: 'Brazil (Sao Paulo)', timezone: 'America/Sao_Paulo' },
  { name: 'South Africa (Johannesburg)', timezone: 'Africa/Johannesburg' },
  { name: 'Iran (Tehran)', timezone: 'Asia/Tehran' },
  { name: 'Netherlands (Amsterdam)', timezone: 'Europe/Amsterdam' },
  { name: 'Switzerland (Zurich)', timezone: 'Europe/Zurich' },
  { name: 'Bangladesh (Dhaka)', timezone: 'Asia/Dhaka' },
  { name: 'North Macedonia (Skopje)', timezone: 'Europe/Skopje' },
  { name: 'Romania (Bucharest)', timezone: 'Europe/Bucharest' },
  { name: 'Canada (Toronto)', timezone: 'America/Toronto' },
  { name: 'Mexico (Mexico City)', timezone: 'America/Mexico_City' },
  { name: 'France (Paris)', timezone: 'Europe/Paris' },
  { name: 'Italy (Rome)', timezone: 'Europe/Rome' },
  { name: 'Russia (Moscow)', timezone: 'Europe/Moscow' },
  { name: 'Egypt (Cairo)', timezone: 'Africa/Cairo' },
  { name: 'New Zealand (Auckland)', timezone: 'Pacific/Auckland' },
  { name: 'Argentina (Buenos Aires)', timezone: 'America/Argentina/Buenos_Aires' },
  { name: 'Singapore', timezone: 'Asia/Singapore' },
  { name: 'United Arab Emirates (Dubai)', timezone: 'Asia/Dubai' },
];

const App = () => {
  // State to hold the list of selected timezones.
  const [timezones, setTimezones] = useState([
    'Asia/Tehran',
    'Africa/Johannesburg',
    'Europe/Zurich',
    'Europe/Amsterdam',
    'Asia/Dhaka',
    'Europe/Skopje',
    'Europe/Bucharest',
    'America/New_York'
  ]);

  // State for the new timezone input
  const [newTimezone, setNewTimezone] = useState('');
  
  // State to hold the current time, updated every second
  const [currentTime, setCurrentTime] = useState(new Date());

  // State for the timezone conversion tool
  const [sourceTimezone, setSourceTimezone] = useState('America/New_York');
  const [targetTimezone, setTargetTimezone] = useState('Europe/London');
  const [conversionTime, setConversionTime] = useState('');
  const [convertedTime, setConvertedTime] = useState('');

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to add a new timezone to the list
  const addTimezone = () => {
    if (newTimezone && !timezones.includes(newTimezone)) {
      setTimezones([...timezones, newTimezone]);
      setNewTimezone('');
    }
  };

  // Function to remove a timezone from the list
  const removeTimezone = (tzToRemove) => {
    setTimezones(timezones.filter((tz) => tz !== tzToRemove));
  };

  // Function to format the time for a given timezone
  const formatTimeForTimezone = (date, timezone) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: timezone,
    }).format(date);
  };

  // Function to perform the timezone conversion
  const convertTime = () => {
    if (!conversionTime) {
      setConvertedTime('');
      return;
    }

    try {
      // Parse the input time as a Date object.
      const [hours, minutes] = conversionTime.split(':').map(Number);
      const now = new Date();
      now.setHours(hours, minutes, 0, 0);

      // The key part: the Date object's internal representation is UTC.
      // We just tell Intl.DateTimeFormat how to display it in the target timezone.
      const convertedFormattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: targetTimezone,
      }).format(now);

      setConvertedTime(convertedFormattedTime);

    } catch (error) {
      console.error("Error converting time:", error);
      setConvertedTime("Invalid time format");
    }
  };

  // Run conversion whenever input values change
  useEffect(() => {
    convertTime();
  }, [conversionTime, sourceTimezone, targetTimezone]);

  // Helper to get the display name from the curated list
  const getDisplayName = (tz) => {
    const found = curatedTimezones.find(item => item.timezone === tz);
    return found ? found.name : tz;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Main Title and Description */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-emerald-400">
          The Great Global Time & Converter
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Track timezones and convert times with ease.
        </p>

        {/* Timezone Display Section */}
        <div className="bg-gray-800 p-6 rounded-3xl shadow-xl mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-teal-300">Current Times</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timezones.map((tz) => (
              <div
                key={tz}
                className="bg-gray-700 p-4 rounded-2xl flex justify-between items-center transform transition-transform duration-200 hover:scale-105"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">{getDisplayName(tz)}</h3>
                  <p className="text-gray-400 text-sm">{tz}</p>
                  <p className="text-2xl font-mono mt-1 text-emerald-200">
                    {formatTimeForTimezone(currentTime, tz)}
                  </p>
                </div>
                <button
                  onClick={() => removeTimezone(tz)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                  aria-label={`Remove ${tz}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Add Timezone Input with a simple dropdown */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <select
              value={newTimezone}
              onChange={(e) => setNewTimezone(e.target.value)}
              className="flex-grow w-full sm:w-auto bg-gray-700 text-white p-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
            >
              <option value="" disabled>Select a timezone...</option>
              {curatedTimezones.map((tz) => (
                <option key={tz.timezone} value={tz.timezone}>
                  {tz.name}
                </option>
              ))}
            </select>
            <button
              onClick={addTimezone}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Add Timezone
            </button>
          </div>
        </div>

        {/* Time Conversion Section */}
        <div className="bg-gray-800 p-6 rounded-3xl shadow-xl">
          <h2 className="2xl font-bold mb-4 text-center text-teal-300">Time Conversion</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2 w-full">
              <label htmlFor="source-tz" className="text-gray-400 text-sm">From Timezone</label>
              <select
                id="source-tz"
                value={sourceTimezone}
                onChange={(e) => setSourceTimezone(e.target.value)}
                className="bg-gray-700 text-white p-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors w-full"
              >
                {curatedTimezones.map((tz) => (
                  <option key={tz.timezone} value={tz.timezone}>
                    {tz.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="time-input" className="text-gray-400 text-sm">Time (24h format)</label>
              <input
                id="time-input"
                type="time"
                value={conversionTime}
                onChange={(e) => setConversionTime(e.target.value)}
                className="bg-gray-700 text-white p-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors w-full"
              />
            </div>
            <div className="text-xl font-bold text-gray-400 mt-4 md:mt-0">to</div>
            <div className="flex flex-col items-center gap-2 w-full">
              <label htmlFor="target-tz" className="text-gray-400 text-sm">To Timezone</label>
              <select
                id="target-tz"
                value={targetTimezone}
                onChange={(e) => setTargetTimezone(e.target.value)}
                className="bg-gray-700 text-white p-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors w-full"
              >
                {curatedTimezones.map((tz) => (
                  <option key={tz.timezone} value={tz.timezone}>
                    {tz.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-xl">Converted Time:</p>
            <p className="text-4xl font-mono font-bold text-emerald-200 mt-2">
              {convertedTime || 'Select a time to convert'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
