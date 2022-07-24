import {useState} from "react";

const useInput = (initial = "") => {
  const [val, setVal] = useState(initial)
  const changeVal = (e) => {
      setVal(e.target.value)
  }
  return [val, changeVal]
}
export default useInput