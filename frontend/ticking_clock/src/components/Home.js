import { useRef, useEffect, useState } from "react";

export default (props) => {
  const [journal, setJournal] = useState([]);

  const journalDateInput = useRef(null);
  const journalTitleInput = useRef(null);
  const journalEntryInput = useRef(null);

  const createJournal = async (event) => {
    event.preventDefault();
    const date = journalDateInput.current.value;
    const title = journalTitleInput.current.value;
    const journalEntry = journalEntryInput.current.value;

    const body = JSON.stringify({
      home: {
        date,
        title,
        journalEntry,
      },
      username: window.localStorage.getItem("username"),
    });
    event.currentTarget.reset();

    try {
      const response = await fetch("http://localhost:3000/api/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      const data = await response.json();
      setJournal([...data.journal]);
      console.log(event.currentTarget);
      console.log(event.target);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={createJournal} className="journalForm">
      <input
        type="text"
        ref={journalDateInput}
        placeholder="Date"
        className="journalInputs"
      />
      <input
        type="text"
        ref={journalTitleInput}
        placeholder="Title"
        className="journalInputs"
      />
      <br />
      {/* <input
        type="text"
        ref={journalEntryInput}
        placeholder="Journal Entry"
        className="journalStoryInput"
      /> */}
      <textarea
        type="text"
        rows="20"
        cols="60"
        ref={journalEntryInput}
        placeholder="Journal Entry"
        className="journalStoryInput"
      />

      <br />

      <input type="submit" value="Add to journal" className="journalBtn" />
    </form>
  );
};
