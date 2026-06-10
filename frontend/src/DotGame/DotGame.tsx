import './DotGame.css'
import { useState } from 'react'
import {RandomDotBot} from './DotBots'
import updateUI from './updateUI';
import checkBox from './checkbox';

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

export default function DotGame({botmode}:{botmode:boolean}){
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
		if(e.target.className==='dot' ||e.target.className==='dotr' || e.target.className==='dotb'){
			if(bufDot===-1){
				setBufDot(Number(e.target.id.slice(1)));
			} else {
				let p1 = Number(e.target.id.slice(1));
				let p2 = bufDot, diff=p1-p2;
        let bi1=-1,bi2=-1, boxx=0,vv;
				// console.log(p2,p1,diff);
				setBufDot(-1);

        if((p1%(len+1)===len && p2%(len+1)===len && Math.abs(p1-p2)===len+1)){
          let pt = Math.min(p1,p2);
          vv = pt - 1 -Math.floor(pt/(len+1));
          let s5 = `border-right: 2px solid green;`

          let boxxx = document.querySelector(`#b${vv}`);
          let bxs = boxxx?.getAttribute('style');
          console.log(p2,p1, pt, vv);
          if(bxs){
            boxxx?.setAttribute('style',bxs+s5);
          } else {
            boxxx?.setAttribute('style',s5);
          }
          

          arrv = [...vedge];
          arrv[Math.floor(vv/len)][len]=1;
          console.log(arrv);
          setVedge(arrv);
          
          boxx = checkBox(Math.floor(vv/len)*(len+1),false,len,hedge,vedge);

        } else if(Math.floor(p1/len+1)===len && Math.floor(p1/len+1)===len){

        }

				else if(diff>0){ //p2 smaller      
          vv=p2 - Math.floor(p2/(len+1));
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
          // if(botmode){
          //   RandomDotBot({len,hedge,vedge, setHedge, setVedge});           
          // }
          if(player=='A'){
            setPlayer('N');
          } 
          else {
            setPlayer('A');
          }
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