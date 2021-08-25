import React from"react";import"./FaceDetect.css";

function FaceDetect({ imageUrl, boxes }) {
    return (<div className="center ma"> <div className="absolute mt2"> <img id="inputimage" alt="" src={imageUrl}style={{width:"250px", height:"auto"}}/> {boxes.map(box => {return <div key={box.topRow} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>})}</div></div>);
}
export default FaceDetect;