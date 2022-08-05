import React, { useEffect } from 'react';
import rotate from "./img/rotate.svg";
import flipH from "./img/flip-h.svg";
import flipV from "./img/flip-v.svg";
import upload from "./img/browser-upload.svg";
import { useState } from 'react';

const App = () => {
  const [err, setErr] = useState("")

  const [brightness, setBrightness] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const [grayscale, setGrayscale] = useState(0);
  const [rotateValue, setRotate] = useState(0);
  const [flip_H, setFlip_H] = useState(1);
  const [flip_V, setFlip_V] = useState(1);
  const [image, setImage] = useState();
  const [filter, setFilter] = useState("");
  const [adjustFor, setAdjustFor] = useState(0);
  const [contrast, setContrast] = useState(50);
  const [sepia, setSepia] = useState(50);
  const [hue, setHue] = useState(50);


  function resetHandler() {
    setBrightness(50)
    setSaturation(50)
    setContrast(50)
    setAdjustFor(0)
    setRotate(0)
    setFlip_H(1)
    setFlip_V(1)
    setGrayscale(0)
    setSepia(0)
    setHue(50)  
  }

  const handleClick = (e) => {
    let imageChoose = document.getElementById("imgfile");
    imageChoose.click()
    imageChoose.addEventListener("change", handleImageUpload)
  }

  const handleImageUpload = (e) => {
    let imageChoose = document.getElementById("imgfile");
    let file = imageChoose.files[0];
    if (!file) {
      return;
    }
    setImage(URL.createObjectURL(file))
    resetHandler()
  }

  const rotateHandlerForward = ()=>{
    setRotate(rotateValue - 90)
    if (rotateValue <= -270) {
      setRotate(0)
    }
  }
  const rotateHandlerBackward = ()=>{
    setRotate(rotateValue + 90)
    if (rotateValue >= 270) {
      setRotate(0)
    }
  }

  const flip_H_handler = ()=>{
    if (flip_H === 1) {
      setFlip_H(-1)
    }else{
      setFlip_H(1)
    }
  }
  const flip_V_handler = ()=>{
    if (flip_V === 1) {
      setFlip_V(-1)
    }else{
      setFlip_V(1)
    }
  }

  // Save the edited image to device
  const handleSaveImage = () =>{
    let imageChoose = document.getElementById("editThis");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imageChoose.clientWidth;
    canvas.height = imageChoose.clientHeight;
    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.filter = filter;
    ctx.scale(flip_H, flip_V)
    if (rotateValue !== 0) {
      ctx.rotate(rotateValue * Math.PI/180)
    }
    ctx.drawImage(imageChoose, -canvas.width /2, -canvas.height /2, canvas.width, canvas.height)
    const link = document.createElement("a");
    link.download = "fabiEdit.jpg";
    link.href = canvas.toDataURL();
    link.click();
  }

  

  useEffect(() => {
    try {
      let editThis = document.getElementById("editThis");
      let brightnessLevel = brightness * 2;
      let saturationLevel = saturation * 2;
      let contrastLevel = contrast * 2;
      let grayscaleLevel = grayscale * 2;
      let hueLevel = (hue * 2)-100;
      editThis.style.filter = `sepia(${sepia}%) brightness(${brightnessLevel}%) saturate(${saturationLevel}%) grayscale(${grayscaleLevel}%) contrast(${contrastLevel}%) hue-rotate(${hueLevel}deg)`;
      setFilter(`sepia(${sepia}%) brightness(${brightnessLevel}%) saturate(${saturationLevel}%) grayscale(${grayscaleLevel}%) contrast(${contrastLevel}%) hue-rotate(${hueLevel}deg)`);
      editThis.style.transform = `rotate(${rotateValue}deg) scaleX(${flip_H}) scaleY(${flip_V})`;
      setErr("") 
    } catch (error) {
      setErr("Please select an image")
    }
  }, [brightness, saturation, contrast, grayscale, hue, sepia, rotateValue, flip_H, flip_V])



  return (
    <div>
      <div className="app">
        <p className="top">
          <span>React Photo Editor</span>
          {err && <p><code>{err}</code></p>}
        </p>
        <div className="main">
          <section>
            <p className="h6">Filters</p>
            <div className="btns">
              <div className={`btn-box ${adjustFor === 0 && "active"}`} onClick={() => setAdjustFor(0)}>Brightness</div>
              <div className={`btn-box ${adjustFor === 1 && "active"}`} onClick={() => setAdjustFor(1)}>Saturation</div>
              <div className={`btn-box ${adjustFor === 2 && "active"}`} onClick={() => setAdjustFor(2)}>Contrast</div>
              <div className={`btn-box ${adjustFor === 3 && "active"}`} onClick={() => setAdjustFor(3)}>Grayscale</div>
              <div className={`btn-box ${adjustFor === 4 && "active"}`} onClick={() => setAdjustFor(4)}>Hue Rotate</div>
              <div className={`btn-box ${adjustFor === 5 && "active"}`} onClick={() => setAdjustFor(5)}>Sepia</div>
            </div>
            <div className="slider">
              <div className="info">
                {adjustFor === 0 && <p className="h6">Brightness</p>}
                {adjustFor === 1 && <p className="h6">Saturation</p>}
                {adjustFor === 2 && <p className="h6">Contrast</p>}
                {adjustFor === 3 && <p className="h6">Grayscale</p>}
                {adjustFor === 4 && <p className="h6">Hue Rotate</p>}
                {adjustFor === 5 && <p className="h6">Sepia</p>}

                {adjustFor === 0 && <p className="h6">{brightness-50}%</p>}
                {adjustFor === 1 && <p className="h6">{saturation-50}%</p>}
                {adjustFor === 2 && <p className="h6">{contrast}%</p>}
                {adjustFor === 3 && <p className="h6">{grayscale}%</p>}
                {adjustFor === 4 && <p className="h6">{hue-50}%</p>}
                {adjustFor === 5 && <p className="h6">{sepia}%</p>}

              </div>
              {adjustFor === 0 && <input type="range" name="" value={brightness} onChange={(e) => setBrightness(e.target.value)} id="" />}
              {adjustFor === 1 && <input type="range" name="" value={saturation} onChange={(e) => setSaturation(e.target.value)} id="" />}
              {adjustFor === 2 && <input type="range" name="" value={contrast} onChange={(e) => setContrast(e.target.value)} id="" />}
              {adjustFor === 3 && <input type="range" name="" value={grayscale} onChange={(e) => setGrayscale(e.target.value)} id="" />}
              {adjustFor === 4 && <input type="range" name="" value={hue} onChange={(e) => setHue(e.target.value)} id="" />}
              {adjustFor === 5 && <input type="range" name="" value={sepia} onChange={(e) => setSepia(e.target.value)} id="" />}
            </div>
            <div className="slider">
              <div className="info">
                <p className="h6">{"Rotate & flip"}</p>
              </div>
              <div className="btn-mini">
                <div className="btn-box-mini" onClick={rotateHandlerForward}>
                  <img src={rotate} alt="" />
                </div>
                <div className="btn-box-mini" onClick={rotateHandlerBackward}>
                  <img src={rotate} alt="" />
                </div>
                <div className="btn-box-mini" onClick={flip_H_handler}>
                  <img src={flipH} alt="" />
                </div>
                <div className="btn-box-mini" onClick={flip_V_handler}>
                  <img src={flipV} alt="" />
                </div>
              </div>
            </div>
          </section>
          <section>
            {!image && <img className='no-img' src={upload} onClick={handleClick} alt="" />}
            {image && <img id='editThis' src={image} alt="" disabled/>}
          </section>
        </div>
        <div className="footer">
          <section>
            <div className="btn-box" onClick={resetHandler}>Reset</div>
            <input type="file" name="" className='imgfile' id="imgfile" hidden />
          </section>
          <section>
            <div className="btn-box file" onClick={handleClick}>
              Upload
            </div>
            <div className="btn-box" onClick={handleSaveImage}>Save Image</div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App;