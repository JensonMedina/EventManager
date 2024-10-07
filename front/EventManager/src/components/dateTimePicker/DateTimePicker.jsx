import React from "react";

const DateTimePicker = ({ date, setDate }) => {
  return (
    <div className="w-full">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-3 py-2 border border-input rounded-md text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent focus-visible:ring-opacity-50"
      />
    </div>
  );
};

export default DateTimePicker;
