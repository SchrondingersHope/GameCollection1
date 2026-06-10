export default function checkBox(vv:number,hori:boolean,len:number, hedge:Array<Array<number>>,vedge:Array<Array<number>>){
  let r = Math.floor(vv/len), c=vv%(len+1);

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