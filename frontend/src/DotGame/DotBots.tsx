import checkBox from "./checkbox";
import updateUI from "./updateUI";

interface RandBotTypes {
    len: number;
    hedge: Array<Array<number>>;
    vedge: Array<Array<number>>;
    setHedge: React.Dispatch<React.SetStateAction<number[][]>>;
    setVedge: React.Dispatch<React.SetStateAction<number[][]>>;
}

function RandomDotBot({len, hedge, vedge,setHedge, setVedge}:RandBotTypes){
    let r = Math.floor(Math.random()*(len)) ;
    let c = Math.floor(Math.random()*(len)) ;
    let dir = Math.floor(Math.random()*2), vv=r*len+c;
    let boxx = checkBox(r*len+c,dir%2===0,len,hedge,vedge);
    let bi1=-1,bi2=-1;

    if(boxx==1){
        bi1 = vv -len*(dir%2) -1*((dir+1)%2);
    } else if(boxx==2){
        bi1 = vv;
    } else if(boxx ==3){
        bi1 = vv -len*(dir%2) -1*((dir+1)%2)
        bi2 = vv;
    }
    //naive???? 2 ways to handle collision, 1 to randomise again, 2 to probe linearly
    if(dir%2!==0){
        if(!vedge[r][c]){
            let arrv = [...vedge];
            arrv[r][c]=1;
            // console.log(arrv);
            setVedge(arrv);

            updateUI(vv,false,'B',boxx>0,bi1,bi2);
            // return ((r*len)+c) ;
        } else {
            RandomDotBot({len,hedge,vedge,setHedge,setVedge});
            // let vv = r*len +c;
            // while(vv++%(len*len)!=r*len+c){
            //     if(!vedge[r][c])
            //     return ((r*len)+c) ;
            //     if(!hedge[r][c])
            //     // return -((r*len)+c) ;
            // }
            //try random for sometime before searching??
        }
    } else {
        if(!hedge[r][c]){
            let arrh = [...hedge];
            arrh[r][c]=1;
            // console.log(arrv);
            setHedge(arrh);
            updateUI(vv,true,'B',boxx>0,bi1,bi2);
            // return -((r*len)+c) ;
        } else {
            RandomDotBot({len,hedge,vedge,setHedge,setVedge});
            // let vv = r*len +c;
            // while(vv++%(len*len)!=r*len+c){
            //     if(!hedge[r][c])
            //     return -((r*len)+c) ;
            //     if(!vedge[r][c])
            //     // return ((r*len)+c) ;
            // }
            //try random for sometime before searching??
        }
    }
    if(boxx>0)RandomDotBot({len,hedge,vedge,setHedge,setVedge});
}

export {RandomDotBot};