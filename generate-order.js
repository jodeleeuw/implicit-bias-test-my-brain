var positive_shape = 'crescent'
var negative_shape = 'hexagon'
var neutral_shape_1 = 'cone'
var neutral_shape_2 = 'rectangle'

var positive_words = ["LUCKY", "RESCUE", "HOPEFUL", "COMFORT", "TERRIFIC", "FLOWER", "GOOD", "KINDNESS", "SAFE", "IMPROVE", "PROTECTED", "ACHIEVEMENT", "BRAVE", "HUG", "LIVELY", "OPTIMISM", "ACCEPTANCE", "DREAM", "CAREFREE", "FREEDOM", "BEAUTIFUL", "RELAXED", "FAMILY", "EASYGOING", "CHEER", "LEISURELY", "MIRACLE", "CONFIDENT", "TRIUMPHANT", "REWARD", "GRATEFUL", "LAUGHTER", "FUN", "PROGRESS", "THOUGHTFUL", "RAINBOW", "JOY", "SOCIAL", "VICTORY", "SOOTHE"]

var negative_words = ["DISTRESSED", "ANXIOUS", "WASTE", "BURIAL", "INFECTION", "FATIGUED", "SEVERE", "GRIEF", "AMBULANCE", "PRESSURE", "SICK", "NIGHTMARE", "OVERWHELMED", "FEVER", "HELPLESS", "DESPAIRING", "UNHAPPY", "GERMS", "OUTRAGE", "DEPRESSED", "TRAUMA", "DISCOURAGED", "SCARED", "MUCUS", "VICTIM", "LONELINESS", "SUFFOCATE", "ROUGH", "WOUNDS", "INSECURE", "DEATH", "STRESS", "TRAGEDY", "USELESS", "PANIC", "ANGUISHED", "HOSPITAL", "BROKEN", "CHAOS", "ANGRY"]

var trials = [
  {shape: positive_shape, word_type: 'positive'},
  {shape: positive_shape, word_type: 'negative'},
  {shape: negative_shape, word_type: 'positive'},
  {shape: negative_shape, word_type: 'negative'},
  {shape: neutral_shape_1, word_type: 'positive'},
  {shape: neutral_shape_1, word_type: 'negative'},
  {shape: neutral_shape_2, word_type: 'positive'},
  {shape: neutral_shape_2, word_type: 'negative'}
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
    order.push(JSON.parse(JSON.stringify(trials[i])));
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

// add words
positive_words = jsPsych.randomization.shuffle(positive_words);
negative_words = jsPsych.randomization.shuffle(negative_words);

for(var i=0; i<order.length; i++){
  if(order[i].word_type == 'positive'){
    order[i].word = positive_words.pop();
  } else {
    order[i].word = negative_words.pop();
  }
}

console.log(order);