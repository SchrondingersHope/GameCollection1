import './DotGame.css'
import { useState } from 'react'

//m1: boxes with dots, needs rep for edges
//m2: dots with div rep of edges, rectangular with width:1/2px and cross-height:~box-size
function Row ({len, ii}:{len:number, ii:number}){
	const arrL = Array(len).fill(0);
	return (
		<div className='row' id={`r${ii}`}>
			{arrL.map((_,i)=>
				<div className='box' key={i} id={`b${i +len*ii}`}>
					<div className="dot" id={`d${i +(len+1)*ii}`} />
					{i==len-1 && <div className="dotr" id={`d${i+1 +(len+1)*ii}`} />}
					{ii==len-1 && <div className="dotb" id={`d${i +(len+1)*(ii+1)}`} />}
					{i==len-1 && ii==len-1 && <div className="dotrb" id={`d${i+1 +(len+1)*(ii+1)}`} />}
				</div>
				)}			
		</div>
	)
}

function updateUI(vv:number,hori:boolean,player:string,boxxx:boolean,bi1:number,bi2?:number){
  let s1 = `border-top: 2px solid green;`
  let s2 = `border-left: 2px solid green;`
  let s3 = s1+s2;
  let s4 = `background-color: limegreen;`;

  let boxx = document.querySelector(`#b${vv}`);	
  //fix it!!
  if(boxx?.getAttribute('style')){
    boxx?.setAttribute('style', s3);
    // return;
  }
  else if(hori) boxx?.setAttribute('style', s1);
  else boxx?.setAttribute('style', s2);

  if(boxxx){
    boxx = document.querySelector(`#b${bi1}`);
    boxx?.setAttribute('style',s4+s1+s2);
    if(boxx) boxx.innerHTML += `${player}`;
    boxx = document.querySelector(`#b${bi2}`);
    boxx?.setAttribute('style',s4+s1+s2);
    if(boxx) boxx.innerHTML += `${player}`;
  }
}

function checkBox(vv:number,hori:boolean,len:number, hedge:Array<Array<number>>,vedge:Array<Array<number>>){
  let r = Math.floor(vv/len), c=vv%len;

  // console.log(vedge[r][c-1],hedge[r+1][c-1],hedge[r][c-1]);

  if(hori){
    let boxxx = 0;
    if(r>0){
      // boxxx = boxxx || (hedge[r-1][c]&&vedge[r-1][c]&&vedge[r-1][c+1]);
      if(hedge[r-1][c]&&vedge[r-1][c]&&vedge[r-1][c+1]){
        boxxx += 1;
      }
    } 
    if(r<len){
      // boxxx = boxxx || (hedge[r+1][c]&&vedge[r][c]&&vedge[r][c+1]);
      if(hedge[r+1][c]&&vedge[r][c]&&vedge[r][c+1]){
        boxxx += 2;
      }
    }
    if(boxxx>0)console.log("Boxxxx!!!!");
    return boxxx;
  } else {
    let boxxx = 0;
    if(c>0){
      // boxxx = boxxx || 
      if(vedge[r][c-1]&&hedge[r][c-1]&&hedge[r+1][c-1]){
        boxxx += 1;
      }
    } 
    if(c<len){
      // boxxx = boxxx || 
      if(vedge[r][c+1]&&hedge[r][c]&&hedge[r+1][c]){
        boxxx += 2;
      }
    }
    if(boxxx)console.log("Boxxxx!!!!");
    return boxxx;
  }
}

export default function DotGame(){
	const [len, setLen] = useState(6);
	const [bufDot, setBufDot] = useState(-1);
	const [player, setPlayer] = useState('A');
	const arrLen = Array(len).fill(0);

	let arrv:Array<Array<number>>=[];
	let arrh:Array<Array<number>>=[];

	arrLen.map((_,i)=>{
		let row:Array<number> = Array(len+1).fill(0);
		let col:Array<number> = Array(len).fill(0);
		arrv.push(row);
		arrh.push(col);
	})
	arrh.push(Array(len).fill(0));

	const [hedge, setHedge]= useState(arrh);
	const [vedge, setVedge] = useState(arrv);
	// const [hedge, setHedge]=useState(Array(len).fill(0)); can store each edge and then use it

	// console.log(hedge, vedge);

	function handleClick(e:any){
		// add corner dots later
		// add edge representation, check if left already exists then add left+top/ if top already exists then left+top, else single only
		if(e.target.className==='dot'){
			if(bufDot===-1){
				setBufDot(Number(e.target.id.slice(1)));
			} else {
				let p1 = Number(e.target.id.slice(1));
				let p2 = bufDot, diff=p1-p2;
        let bi1=-1,bi2=-1, boxx=0;
				// console.log(p2,p1,diff);
				setBufDot(-1);

				if(diff>0){ //p2 smaller      
          let vv=p2 - Math.floor(p2/(len+1));
          boxx = checkBox(vv,diff===1,len,hedge,vedge);
        
					if(diff===1){
            arrh = [...hedge];
            arrh[Math.floor(vv/len)][vv%len]=1;
            // console.log(arrh);
            setHedge(arrh);

            if(boxx==1){
              bi1 = vv-len;
            } else if(boxx==2){
              bi1 = vv;
            } else if(boxx ==3){
              bi1 = vv-len;
              bi2 = vv;
            }

            updateUI(vv,true,player,boxx>0,bi1,bi2);
					} 
					else if(diff===len+1) {
            arrv = [...vedge];
            arrv[Math.floor(vv/len)][vv%len]=1;
            // console.log(arrv);
            setVedge(arrv);

            if(boxx==1){
              bi1 = vv-1;
            } else if(boxx==2){
              bi1 = vv;
            } else if(boxx ==3){
              bi1 = vv-1;
              bi2 = vv;
            }

            updateUI(vv,false,player,boxx>0,bi1,bi2);
					}
				} else { // p1 smaller
          let vv = p1 - Math.floor(p1/(len+1));
          boxx = (checkBox(vv,diff===-1,len,hedge,vedge));
					
					if(diff ===- 1){
            arrh = [...hedge];
            arrh[Math.floor(vv/len)][vv%len]=1;
            // console.log(arrh);
            setHedge(arrh);

            if(boxx==1){
              bi1 = vv-len;
            } else if(boxx==2){
              bi1 = vv;
            } else if(boxx ==3){
              bi1 = vv-len;
              bi2 = vv;
            }

            updateUI(vv,true,player,boxx>0,bi1,bi2);
					} 
          else if(diff === -len-1){
            arrv = [...vedge];
            arrv[Math.floor(vv/len)][vv%len]=1;
            // console.log(arrv);
            setVedge(arrv);

            if(boxx==1){
              bi1 = vv-1;
            } else if(boxx==2){
              bi1 = vv;
            } else if(boxx ==3){
              bi1 = vv-1;
              bi2 = vv;
            }

            updateUI(vv,false,player,boxx>0,bi1,bi2);
					} 

				}

        if(!boxx){
          if(player=='A') setPlayer('N');
          else setPlayer('A');
        }
			}
		}
		console.log(Number(e.target.id.slice(1)));
	}

	return(
		<div className='grid' onClick={handleClick}>
			{arrLen.map((_,i)=>
				<Row len={len} ii={i} key={i}/>
			)}			
		</div>
	)
}