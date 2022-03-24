import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../firebase";

const Chat = () => {
  const navigate = useNavigate();
  let { id, sid } = useParams();
  const [threads, setThreads] = useState({
    sender: sid,
    receiver: id,
  });
  console.log(threads);
  //************************************************************************************************************************** */
  useEffect(() => {
    appRef.child("Chat_Threads").on("value", (snap) => {
      let same = false;
      if (snap.val()) {
        Object.values(snap.val()).map((cid) => {
          if (
            cid.sender === threads.sender &&
            cid.receiver === threads.receiver
          ) {
            same = true;
          }
        });
        if (!same) {
          appRef.child("Chat_Threads").push(threads, () => console.log("Done"));
        }
      }
    });
  }, []);

  //************************************************************************************************************************** */

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <div>
        chat
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Chat;
