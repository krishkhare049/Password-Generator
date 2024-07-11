import { useState, useCallback, useEffect, useRef } from "react";
// import "./App.css";
import password_icon from "./assets/password_icon.png";
import Swal from "sweetalert2";

function App() {
  const [length, setLength] = useState(8);
  const [isNumAllowed, setNumAllowed] = useState(true);
  const [isCharAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  const [attach_str, setAttachStr] = useState("");

  const [isCapitalizeAllowed, setCapitalizeAllowed] = useState(false);
  const [isSmallCaseAllowed, setSmallCaseAllowed] = useState(false);

  const generate_passowrd = useCallback(() => {
    console.log("New password generated!");
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";

    if (isNumAllowed) {
      str += "1234567890";
    }
    if (isCharAllowed) {
      str += "+-@#$%^&*_|?/!.,;:";
    }

    if (isCapitalizeAllowed) {
      str = str.replace("abcdefghijklmnopqrstuvxyz", "");
      setAttachStr(attach_str.toUpperCase());
    }
    if (isSmallCaseAllowed) {
      str = str.replace("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "");
      setAttachStr(attach_str.toLowerCase());
    }

    if (isCharAllowed) {
      str += "+-@#$%^&*_|?/!.,;:";
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    // setPassword(pass);

    // Attach string-
    // setPassword(attach_str + pass);
    setPassword(pass);
  }, [
    length,
    isNumAllowed,
    isCharAllowed,
    attach_str,
    isCapitalizeAllowed,
    isSmallCaseAllowed,
    setPassword,
  ]);

  useEffect(() => {
    generate_passowrd();
  }, [
    length,
    isNumAllowed,
    isCharAllowed,
    attach_str,
    isCapitalizeAllowed,
    isSmallCaseAllowed,
    generate_passowrd,
  ]);

  const pass_Ref = useRef(null);

  const capital_Ref = useRef(null);
  const small_Ref = useRef(null);
  const attachedPassRef = useRef(null);

  // Copy password to clipboard-
  const copy_Pass_to_clipboard = () => {
    pass_Ref.current?.select(); // selecting optionally
    // pass_Ref.current?.setSelectionRange(0,20)
    // attachedPassRef.current?.select();

    console.log(attach_str + password);
    let total_pass = attach_str + password;

    console.log("Copied to clipboard!");
    // window.navigator.clipboard.writeText(password);
    window.navigator.clipboard.writeText(total_pass);

    Swal.fire({
      title: "Password copied!",
      text: "Your password is { " + total_pass + "}",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };

  return (
    <>
      <div style={{ backgroundColor: "#1C538E" }} className="w-full h-screen">
        <div className="flex flex-col items-center p-5">
          <img src={password_icon} alt="" className="w-24" />
          <h1 className=" rounded-xl p-2 m-5 left-12 static text-center text-4xl font-bold text-white">
            Password Generator
          </h1>
          <div
            className="h-auto w-full max-w-xl mx-auto rounded-xl flex justify-center items-center flex-col flex-wrap"
            style={{ backgroundColor: "#a3afdf" }}
          >
            <div className="my-2 flex justify-center items-center w-11/12">
              {/* <p className="bg-slate-600 text-white rounded-xl py-2 px-2" ref={attachedPassRef}>{attach_str}</p> */}

              <input
                type="text"
                className="bg-slate-600 text-white rounded-xl py-3 px-2 w-14 text-xs text-center rounded-r-none"
                value={attach_str}
                ref={attachedPassRef}
                readOnly
              />

              <input
                type="text"
                className="p-2 m-1 ml-0 h-10 w-11/12 max-w-96 mr-0 text-sm"
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

            <div className="flex justify-evenly flex-wrap flex-col items-center">
              <div className="flex items-center justify-center flex-wrap">
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
              <br />

              <div className="flex my-1">
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

              <p className="p-2  mt-3 mb-2 bg-slate-800 text-white rounded-md text-xs">
                Additional settings-
              </p>
              {/* Attach string */}
              <div className="flex items-center flex-wrap justify-center mb-4">
                <label
                  htmlFor="attach_string"
                  className="text-white bg-blue-700 py-1 px-2 rounded-xl mx-2 text-sm"
                >
                  Attach string
                </label>
                <br />
                <input
                  type="text"
                  id="attach_string"
                  placeholder="any string"
                  value={attach_str}
                  className="rounded-lg px-2 py-1 m-1 text-cyan-950"
                  maxLength={8}
                  onChange={(e) => {
                    setAttachStr(e.target.value);
                  }}
                />
              </div>

              <div className="flex justify-evenly mb-2">
                {/* All capital letters */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name=""
                    id="caps_check"
                    className="mr-1"
                    onChange={() => {
                      setCapitalizeAllowed((prev) => !prev);
                      setSmallCaseAllowed(false);

                      console.log(small_Ref.current.checked);
                      if (small_Ref.current.checked == true) {
                        small_Ref.current.checked = !small_Ref.current.checked;
                      }
                    }}
                    ref={capital_Ref}
                  />
                  <label htmlFor="caps_check" className="text-base mr-3">
                    Capitalize all
                  </label>
                </div>

                {/* All small letters */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name=""
                    id="small_check"
                    className="mr-1"
                    onChange={() => {
                      setSmallCaseAllowed((prev) => !prev);
                      setCapitalizeAllowed(false);

                      console.log(capital_Ref.current.checked);
                      if (capital_Ref.current.checked == true) {
                        capital_Ref.current.checked =
                          !capital_Ref.current.checked;
                      }
                    }}
                    ref={small_Ref}
                  />
                  <label htmlFor="small_check" className="text-base mr-3">
                    Small case all
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
