import React, { useState } from 'react';

const Reminder = () => {
  const [reminderTime, setReminderTime] = useState('');
  const [reminderSet, setReminderSet] = useState(false);

  const handleSetReminder = () => {
    if (reminderTime) {
      alert(`Reminder set for ${reminderTime}`);
      setReminderSet(true);
    } else {
      alert('Please select a time for the reminder.');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Set Meditation Reminder</h3>
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <button
        onClick={handleSetReminder}
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Set Reminder
      </button>

      {reminderSet && (
        <div className="mt-2 text-sm text-green-600">
          Reminder successfully set for {reminderTime}.
        </div>
      )}
    </div>
  );
};

export default Reminder;
