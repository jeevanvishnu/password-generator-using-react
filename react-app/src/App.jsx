import { useCallback, useEffect, useRef, useState } from "react";
import "./index.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
function App() {
  const [password, SetPassword] = useState("");
  const [Length, setLength] = useState(8);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [NumberAllowed, setNumberAllowed] = useState(false);

  // notification

  const notify = () => toast("Copying");

  // generate password function

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    if (NumberAllowed) str += "12345678910";
    if (CharAllowed) str += "!@#$%^&*()";

    for (let i = 1; i <= Length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    SetPassword(pass);
  }, [Length, NumberAllowed, CharAllowed]);

  //  generate password function calling
  useEffect(() => {
    generatePassword();
  }, [Length, NumberAllowed, CharAllowed]);

  // calling copyText

  const copyText = useCallback(() => {
    console.log("clicked");
    window.navigator.clipboard.writeText(password);
    passref.current?.select();
  }, [password]);
  // select text using useRef
  const passref = useRef(null);

  // const handleClick
  const handleClick = () => {
    copyText();
    notify();
  };
  return (
    <div className="bg-gray-700 rounded-lg max-w-md mx-auto shadow px-3 py-3   text-orange-500">
      <h1 className="text-center text-white">Password Generator</h1>
      <div className="flex shadow-lg overflow-hidden mb-4 my-4">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          className="w-full px-3 py-1 rounded "
          ref={passref}
        />
        <button
          className="bg-blue-700 text-white shrink-0 py-1 px-3 text-center"
          onClick={handleClick}
        >
          Copy
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <input
          value={Length}
          type="range"
          min={6}
          max={100}
          className="cursor-pointer"
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <label htmlFor="length">Length:{Length}</label>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name=""
            id=""
            defaultChecked={NumberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="number">Number</label>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={CharAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="Character">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
