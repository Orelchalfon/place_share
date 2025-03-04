/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Button from "../UIElements/Button";
import "./ImageUpload.css";
const ImageUpload = (props) =>
{
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() =>
  {
    if (!file) {

      return;
    }
    console.log(`file`, file);
    const fileReader = new FileReader();
    console.log(`fileReader`, fileReader);
    fileReader.onload = () => { setPreviewUrl(fileReader.result); };
    
    fileReader.readAsDataURL(file);
    
    console.log(`fileReader`, fileReader);
  }, [file, previewUrl])

  const pickedHandler = (e) =>
  {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      if (previewUrl) return

      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid)
  }
  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={() => filePickerRef.current.click()}>PICK IMAGE</Button>

      </div>
      {!isValid && <p>{props.errorText}</p>}



    </div>
  )
}

export default ImageUpload;
