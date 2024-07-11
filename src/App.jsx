import { useState, useCallback, useEffect, useRef } from "react";
// import "./App.css";
import password_icon from "./assets/password_icon.png";

function App() {
  const [length, setLength] = useState(8);
  const [isNumAllowed, setNumAllowed] = useState(true);
  const [isCharAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  const generate_passowrd = useCallback(() => {
    console.log("New password generated!");
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";

    if (isNumAllowed) {
      str += "1234567890";
    }
    if (isCharAllowed) {
      str += "@#$%^&*_|?/";
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isNumAllowed, isCharAllowed, setPassword]);

  useEffect(() => {
    generate_passowrd();
  }, [length, isNumAllowed, isCharAllowed, generate_passowrd]);

  const pass_Ref = useRef(null);

  // Copy password to clipboard-
  const copy_Pass_to_clipboard = () => {
    pass_Ref.current?.select(); // selecting optionally
    // pass_Ref.current?.setSelectionRange(0,20)

    console.log("Copied to clipboard!");
    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#1C538E" }}
        className="w-full h-screen p-5 flex justify-center flex-col items-center"
      >
        <img src={password_icon} alt="" className="w-24" />
        <h1 className=" rounded-xl p-2 m-5 left-12 static text-center text-4xl font-bold text-white">
          Password Generator
        </h1>
        <div
          className="h-48 w-full max-w-xl mx-auto rounded-xl flex justify-center items-center flex-col"
          style={{ backgroundColor: "#a3afdf" }}
        >
          <div className="my-2 flex justify-center items-center">
            <input
              type="text"
              className="p-2 m-1 h-10 rounded-md rounded-r-none w-96 mr-0 text-sm"
              value={password}
              ref={pass_Ref}
              readOnly
            />
            <button
              className="bg-blue-600 text-white px-2 py-0.5 h-10 rounded-xl rounded-l-none hover:bg-blue-500 active:scale-95 active:bg-blue-800"
              onClick={copy_Pass_to_clipboard}
            >
              Copy
            </button>
          </div>

          <div className="flex justify-evenly">
            <div className="flex items-center">
              <input
                type="range"
                style={{ backgroundColor: "red" }}
                className="mr-2 cursor-pointer"
                name=""
                id="len_range"
                min={8}
                max={72}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="len_range" className="text-base mr-3">
                Length ({length})
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id="num_check"
                className="mr-1"
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
                defaultChecked={true}
              />
              <label htmlFor="num_check" className="text-base mr-3">
                Numbers
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id="char_check"
                className="mr-1"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="char_check" className="text-base mr-3">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
