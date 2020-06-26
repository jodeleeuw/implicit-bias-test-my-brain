var positive_shape = 'crescent'
var negative_shape = 'hexagon'
var neutral_shape_1 = 'cone'
var neutral_shape_2 = 'rectangle'

var training_phase_trials = [
  { "shape": "cone", "word_type": "positive", "word": "ACCEPTANCE" },
  { "shape": "rectangle", "word_type": "negative", "word": "FEVER" },
  { "shape": "cone", "word_type": "negative", "word": "USELESS" },
  { "shape": "hexagon", "word_type": "negative", "word": "DEATH" },
  { "shape": "hexagon", "word_type": "positive", "word": "FLOWER" },
  { "shape": "cone", "word_type": "positive", "word": "FAMILY" },
  { "shape": "crescent", "word_type": "positive", "word": "REWARD" },
  { "shape": "crescent", "word_type": "positive", "word": "TRIUMPHANT" },
  { "shape": "cone", "word_type": "negative", "word": "SEVERE" },
  { "shape": "cone", "word_type": "positive", "word": "LUCKY" },
  { "shape": "rectangle", "word_type": "negative", "word": "DISTRESSED" },
  { "shape": "cone", "word_type": "positive", "word": "JOY" },
  { "shape": "cone", "word_type": "negative", "word": "BROKEN" },
  { "shape": "rectangle", "word_type": "positive", "word": "CONFIDENT" },
  { "shape": "rectangle", "word_type": "positive", "word": "OPTIMISM" },
  { "shape": "crescent", "word_type": "positive", "word": "TERRIFIC" },
  { "shape": "crescent", "word_type": "negative", "word": "ANGUISHED" },
  { "shape": "hexagon", "word_type": "positive", "word": "KINDNESS" },
  { "shape": "crescent", "word_type": "positive", "word": "PROGRESS" },
  { "shape": "cone", "word_type": "negative", "word": "CHAOS" },
  { "shape": "rectangle", "word_type": "positive", "word": "ACHIEVEMENT" },
  { "shape": "hexagon", "word_type": "negative", "word": "AMBULANCE" },
  { "shape": "hexagon", "word_type": "negative", "word": "VICTIM" },
  { "shape": "cone", "word_type": "positive", "word": "SAFE" },
  { "shape": "crescent", "word_type": "positive", "word": "HUG" },
  { "shape": "rectangle", "word_type": "positive", "word": "RELAXED" },
  { "shape": "hexagon", "word_type": "negative", "word": "HELPLESS" },
  { "shape": "hexagon", "word_type": "negative", "word": "NIGHTMARE" },
  { "shape": "cone", "word_type": "negative", "word": "TRAUMA" },
  { "shape": "rectangle", "word_type": "negative", "word": "ROUGH" },
  { "shape": "crescent", "word_type": "positive", "word": "MIRACLE" },
  { "shape": "hexagon", "word_type": "negative", "word": "INSECURE" },
  { "shape": "crescent", "word_type": "positive", "word": "BEAUTIFUL" },
  { "shape": "hexagon", "word_type": "negative", "word": "PRESSURE" },
  { "shape": "hexagon", "word_type": "negative", "word": "PANIC" },
  { "shape": "cone", "word_type": "positive", "word": "FUN" },
  { "shape": "crescent", "word_type": "positive", "word": "RESCUE" },
  { "shape": "crescent", "word_type": "positive", "word": "BEAUTIFUL" },
  { "shape": "cone", "word_type": "positive", "word": "VICTORY" },
  { "shape": "cone", "word_type": "negative", "word": "LONELINESS" },
  { "shape": "cone", "word_type": "positive", "word": "PROTECTED" },
  { "shape": "rectangle", "word_type": "negative", "word": "ANXIOUS" },
  { "shape": "crescent", "word_type": "positive", "word": "DREAM" },
  { "shape": "rectangle", "word_type": "negative", "word": "DESPAIRING" },
  { "shape": "hexagon", "word_type": "negative", "word": "GRIEF" },
  { "shape": "hexagon", "word_type": "negative", "word": "INFECTION" },
  { "shape": "hexagon", "word_type": "positive", "word": "COMFORT" },
  { "shape": "hexagon", "word_type": "negative", "word": "TRAGEDY" },
  { "shape": "cone", "word_type": "negative", "word": "DEPRESSED" },
  { "shape": "rectangle", "word_type": "positive", "word": "IMPROVE" },
  { "shape": "hexagon", "word_type": "positive", "word": "SOOTHE" },
  { "shape": "cone", "word_type": "negative", "word": "DISCOURAGED" },
  { "shape": "cone", "word_type": "negative", "word": "WASTE" },
  { "shape": "rectangle", "word_type": "positive", "word": "RAINBOW" },
  { "shape": "rectangle", "word_type": "negative", "word": "FATIGUED" },
  { "shape": "crescent", "word_type": "positive", "word": "GOOD" },
  { "shape": "hexagon", "word_type": "negative", "word": "HOSPITAL" },
  { "shape": "rectangle", "word_type": "positive", "word": "LAUGHTER" },
  { "shape": "hexagon", "word_type": "negative", "word": "SICK" },
  { "shape": "cone", "word_type": "positive", "word": "HOPEFUL" },
  { "shape": "crescent", "word_type": "negative", "word": "SCARED" },
  { "shape": "rectangle", "word_type": "negative", "word": "OUTRAGE" },
  { "shape": "crescent", "word_type": "positive", "word": "CHEER" },
  { "shape": "rectangle", "word_type": "positive", "word": "THOUGHTFUL" },
  { "shape": "rectangle", "word_type": "negative", "word": "ANGRY" },
  { "shape": "rectangle", "word_type": "negative", "word": "STRESS" },
  { "shape": "rectangle", "word_type": "positive", "word": "GRATEFUL" },
  { "shape": "hexagon", "word_type": "negative", "word": "OVERWHELMED" },
  { "shape": "crescent", "word_type": "negative", "word": "WOUNDS" },
  { "shape": "crescent", "word_type": "positive", "word": "TRIUMPHANT" },
  { "shape": "rectangle", "word_type": "positive", "word": "SOCIAL" },
  { "shape": "crescent", "word_type": "positive", "word": "LEISURELY" },
  { "shape": "rectangle", "word_type": "negative", "word": "BURIAL" },
  { "shape": "cone", "word_type": "negative", "word": "GERMS" },
  { "shape": "hexagon", "word_type": "negative", "word": "SUFFOCATE" },
  { "shape": "cone", "word_type": "positive", "word": "EASYGOING" },
  { "shape": "crescent", "word_type": "positive", "word": "FREEDOM" },
  { "shape": "crescent", "word_type": "positive", "word": "CAREFREE" },
  { "shape": "hexagon", "word_type": "negative", "word": "UNHAPPY" },
  { "shape": "crescent", "word_type": "negative", "word": "MUCUS" }
]
