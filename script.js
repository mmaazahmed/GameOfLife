const canvas=document.getElementById('mycanvas');
canvas.style.background="#1729";
const ctx=canvas.getContext("2d");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
window.addEventListener('resize', resizeCanvas, false);



function board(width,height,point,subd){
    this.center_point=point;
    this.width=width;
    this.height=height;
    this.cell=[this.width/subd,this.width/subd];
    this.active_cells=new Set();

    this.debug_draw_coord=()=>{
        let v_offset=this.cell[1];
        let h_offset=this.cell[0];
        ctx.save();
        ctx.font = "15px serif";
        ctx.fillStyle='blue';

        for(let i=0;i<this.width/h_offset;i++){
            for(let j=0;j<this.height/v_offset;j++){
                const x=this.center_point[0] + (h_offset*i);
                const y=this.center_point[1] + (v_offset*j)+v_offset/2;
                ctx.fillText(`  ${i},${j} `,x , y);  
                // ctx.save();
                // ctx.beginPath();

                // ctx.arc(x,y,5,0,Math.PI*2);
                // ctx.fill();
                // ctx.closePath();

                // ctx.restore();


            }
        }
        ctx.restore();

        
        
        
        // ctx.fillRect(this.center_point[0]+(h_offset*x), this.center_point[1]+(v_offset*y), h_offset,v_offset)

    }
    this.add_active_cells=(cells)=>{
        for (const cell of cells){
            this.active_cells.add(cell);
        }
    // console.log(this.active_cells);
    }
    this.draw_grid=()=>{
        ctx.beginPath();

        this.draw_boundry();
        this.draw_vertical_lines();
        this.draw_horizontal_lines();
         ctx.stroke();
        // ctx.closePath();
    }
 
    this.draw_boundry=()=>{
        // ctx.beginPath();
        ctx.rect(this.center_point[0], this.center_point[1], this.width, this.height);
        ctx.strokeStyle='black';
        // ctx.stroke();
        // ctx.closePath();
    }

    this.draw_vertical_lines=()=>{
        const offset=this.cell[1];
        for(let i=1;i<width/offset;i++){
            // ctx.beginPath(); 
            ctx.moveTo(this.center_point[0]+offset*i,this.center_point[1]);
            ctx.lineTo(this.center_point[0]+offset*i,this.center_point[1]+height);
            ctx.strokeStyle='black';
            // ctx.stroke();
            // ctx.closePath();

        }
    
    }
    this.draw_horizontal_lines=()=>{
        const offset=this.cell[0];
        for(let i=1;i<height/offset;i++){
            ctx.moveTo(point[0],point[1]+offset*i);
            ctx.lineTo(point[0]+this.width,point[1]+offset*i);
            ctx.strokeStyle='black';
        }
    
    }

    this.draw_cell=(x,y)=>{
        let v_offset=this.cell[1];
        let h_offset=this.cell[0];
        ctx.fillStyle='pink';
        ctx.fillRect(this.center_point[0]+(h_offset*x), this.center_point[1]+(v_offset*y), h_offset,v_offset);   
    }
    this.add_glider=(x,y)=>{
        //to do
    }
    this.add_active_cell=(x,y)=>{
        this.active_cells.add(`${x},${y}`);
    }
    this.remove_active_cell=(x,y)=>{
        this.active_cells.delete(`${x},${y}`);
    }
    this.get_neighbours=(x,y)=>{ 
      
        const neighbours=[];
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i !== x || j !== y) {
                    neighbours.push(`${i},${j}`);
                }
            }
        }
    
        return neighbours;
    }
    this.remove_cells=(cells_to_remove)=>{
        for(const cell of cells_to_remove){
            this.active_cells.delete(cell);
        }
    }
    
    this.add_cells=(cells_to_add)=>{
        for(const cell of cells_to_add){
            this.active_cells.add(cell);
        }
    }
    this.get_neighbours_count=()=>{
        const neighbours_count={};
        for(const active_cell of this.active_cells){
            const [x,y]=active_cell.split(',').map(Number);
            const neighbours=this.get_neighbours(x,y);

            for(const neighbour of neighbours){
                neighbours_count[neighbour]= ( neighbours_count[neighbour] || 0)+1;
            }
        }
         // If a cell has no live neighbors, initialize its count to 0
        for (const active_cell of this.active_cells) {
            if (!neighbours_count[active_cell]) {

                neighbours_count[active_cell] = 0;
            }
        }
        return neighbours_count;


    }
   
    
    this.update=()=>{
        const cells_to_remove=new Set();
        const cells_to_add=new Set();
        const neighbours_count=this.get_neighbours_count();

        for(const [cell,count] of Object.entries(neighbours_count)){
            if ((count === 2 || count === 3) && this.active_cells.has(cell)) {
                continue;
            }

            if ( (count<2 || count>3) && this.active_cells.has(cell)){
                cells_to_remove.add(cell);
                
            }

            if(count===3 && !this.active_cells.has(cell)){
                cells_to_add.add(cell);
                
            }
        }
       
        this.remove_cells(cells_to_remove);
        this.add_cells(cells_to_add);
    }
   
    this.run=()=>{

        for(const active_cell of this.active_cells){
            let [x,y]=active_cell.split(',').map(Number);
            this.draw_cell(x,y);
           
        }
        console.log(this.get_neighbours_count());
        this.update();

    }

}

let cells=[];
cells=["0,1", "1,2", "2,0","2,1","2,2","7,7","7,8","6,10","7,5"];
// const cells=[  "5,6", "6,7", "7,5", "7,6", "7,7"];
// const cells = ["5,6", "6,7", "7,5", "7,6", "7,7"];
// cells=["0,1","7,7","7,8","6,10","7,5"];

let point=[1,1];
let game=new board(canvas.width,canvas.width,point,400);
game.draw_grid();
game.add_active_cells(cells);  


game.run();
game.debug_draw_coord();

function animate(){
    setTimeout(function () {
        // Your animation logic goes here

        requestAnimationFrame(animate);
    }, 1000/60);
    
    // requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    game.draw_grid();
    // game.debug_draw_coord();
    game.run();
    // console.log(game.active_cells);
    

}
function resizeCanvas(){
    canvas.width =window.innerWidth;
    canvas.height = window.innerHeight;
   
}

animate  ();


