var trials = [
  {shape: 'triangle', word: 'positive'},
  {shape: 'triangle', word: 'negative'},
  {shape: 'circle', word: 'positive'},
  {shape: 'circle', word: 'negative'},
  {shape: 'square', word: 'positive'},
  {shape: 'square', word: 'negative'},
  {shape: 'star', word: 'positive'},
  {shape: 'star', word: 'negative'}
]

var count = [
  16,
  4,
  4,
  16,
  10,
  10,
  10,
  10
]

var order = [];

for(var i=0; i<trials.length; i++){
  for(var j=0; j<count[i]; j++){
    order.push(trials[i]);
  }
}

order = jsPsych.randomization.shuffle(order);

var complete = false;
while(!complete){
  complete = true;
  for(var i=0; i<order.length; i++){
    if(JSON.stringify(order[i]) == JSON.stringify(order[i+1]) && JSON.stringify(order[i]) == JSON.stringify(order[i+2])){
      var swap = Math.floor(Math.random()*(order.length-1));
      order[i+2] = order[swap];
      order[swap] = order[i+1];
      complete = false;
    }
  }
}

console.log(order);