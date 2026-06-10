export default function updateUI(vv:number,hori:boolean,player:string,boxxx:boolean,bi1:number,bi2?:number){
  let s1 = `border-top: 2px solid green;`
  let s2 = `border-left: 2px solid green;`
  let s3 = s1+s2;
  let s4 = `background-color: limegreen;`;

  let boxx = document.querySelector(`#b${vv}`);	
  //fix it!!
  let bxs = boxx?.getAttribute('style');
  if(bxs){
    if(hori){
      boxx?.setAttribute('style',bxs+s1);
    } else {
      boxx?.setAttribute('style',bxs+s2)
    } 
  } else {
    if(hori){
      boxx?.setAttribute('style',s1);
    } else {
      boxx?.setAttribute('style',s2)
    } 
  }

  // if(boxx?.getAttribute('style')){
  //   boxx?.setAttribute('style', s3);
  //   // return;
  // }
  // else if(hori) boxx?.setAttribute('style', s1);
  // else boxx?.setAttribute('style', s2);

  if(boxxx){
    boxx = document.querySelector(`#b${bi1}`);
    boxx?.setAttribute('style',s4+s1+s2);
    if(boxx) boxx.innerHTML += `${player}`;
    boxx = document.querySelector(`#b${bi2}`);
    boxx?.setAttribute('style',s4+s1+s2);
    if(boxx) boxx.innerHTML += `${player}`;
  }
}