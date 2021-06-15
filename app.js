/*functions to build
i) random sequence generator
a)generate rand sequence  - DONE
b)select & light buttons based on sequence - DONE
ii) user selected sequence 
a)click eventlisteners - DONE
b)push input sequence - DONE
c)compare with random seq -DONE
iii) handle game state 
a)increase level with each correct solution
iv) game options 
a)choose level 
b) highest score 
*/
//select & initialize the fellas

let playerSeq = [];
let start = document.getElementById('start');
let seq = [];
let level = 4;
//proper sleep func
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//updates player input sequence 
    function playerClick(btnClick){
                    playerSeq.push(btnClick.target.innerHTML);
                    if (playerSeq.length < level) {
                console.log(playerSeq)
                    }
                    else  {
        //check sequences
                        if (playerSeq.every( (value, idx) => parseInt(value) === seq[idx])){
                            alert('Correct!');
                            seq = [];
                            playerSeq = [];
                            level++;
                            document.getElementById('start').click();        
                        } else {
                            alert('Sorry :( , press START to try again!');
                            seq = [];
                            playerSeq = [];
                            playerSeq.length = 0; 
                            document.getElementById('start').click();      
                        }
                    }
                    
                                     
        }

//generate random sequence based on selected level
const randSeq = (lvl) => {
    for (let i = 0; i < lvl; i++){
        seq.push(Math.floor(( Math.random()*4) + 1 ));
        
    }
       
    return seq;    
}
//flash buttons according to random sequence
start.addEventListener('click', function flash() {
//remove event listener after first success onwards
//this ensures button clicks don't duplicate 
    if ( level < 4 ) {
        return;
        } else {
            console.log(level )
        document.querySelectorAll('.seq-btn').forEach( e => e.removeEventListener('click', playerClick ), true )
        }
document.querySelectorAll('.seq-btn').forEach( e => e.disabled = true);
let i = 0;
randSeq(level);
console.log(seq)
//flashes each button red according to rand. sequence
const flashRand = setInterval( () => {

//clears all buttons after each flash
    for (let j = 0; j < level; j++){
        document.getElementById(`seqBtn_${seq[j]}`).style.backgroundColor = 'white'
    }
sleep(500).then( () => {
    if ( i < level){
    document.getElementById(`seqBtn_${seq[i]}`).style.backgroundColor = 'red';
    i++;
    } else {
    clearInterval(flashRand);
    alert("Now it's your turn!");
    document.querySelectorAll('.seq-btn').forEach( e => e.disabled = false);
    document.querySelectorAll('.seq-btn').forEach(e => e.addEventListener('click', playerClick))
    }  })
    
        
},1000);

})


