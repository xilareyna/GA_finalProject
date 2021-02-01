import { useRef, useEffect } from "react";

export default (props) => {
  const journalDateInput = useRef(null);
  const journalTitleInput = useRef(null);
  const journalEntryInput = useRef(null);

  const createJournal = async (event) => {
    event.preventDefault();
    const date = journalDateInput.current.value;
    const title = journalTitleInput.current.value;
    const journalEntry = journalEntryInput.current.value;

    const body = JSON.stringify({
      date,
      title,
      journalEntry,
    });
    event.currentTarget.reset();

    try {
      const response = await fetch("http://localhost:3000/home", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: body,
      });
      const data = await response.json();
      props.updateJournal([...props.journal, data]);
      console.log(event.currentTarget);
      console.log(event.target);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={createJournal} className="journalForm">
      <input type="text" ref={journalDateInput} placeholder="Date" />
      <input type="text" ref={journalTitleInput} placeholder="Title" />
      <br />
      {/* <input
        type="text"
        ref={journalEntryInput}
        placeholder="Journal Entry"
        className="journalStoryInput"
      /> */}
      <textarea
        type="text"
        rows="30"
        cols="50"
        ref={journalEntryInput}
        placeholder="Journal Entry"
        className="journalStoryInput"
      />

      <br />

      <input type="submit" value="Add to journal" className="journalBtn" />
    </form>
  );
};
