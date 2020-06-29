
    var shape_vals = {}
    shape_vals[negative_shape] = 'negative';
    shape_vals[positive_shape] = 'positive';
    shape_vals[neutral_shape_1] = 'neutral';
    shape_vals[neutral_shape_2] = 'neutral';

    var timeline = [];

    /* define task instructions */

    var instructions_pre_training = {
      type: 'html-button-response',
      stimulus: '<div class="instructions">'+
        '<p>You will see a set of shapes (for example, squares) on the screen for a brief moment. Press the button corresponding to the number of shapes on the screen. You need to be as quick as possible. You will now do a short practice.</p>'+
        '</div>',
      choices: ['Start Practice'],
      data: {task: 'instructions'}
    }

    var instructions_post_practice = {
      type: 'html-button-response',
      stimulus: '<div class="instructions">'+
        '<p>You have completed the practice. Click the button to begin the task.</p>'+
        '</div>',
      choices: ['Start Task'],
      data: {task: 'instructions'}
    }

    var instructions_pre_test = {
      type: 'html-button-response',
      stimulus: '<div class="instructions">'+
        '<p>You completed the first part of the task.</p>'+
        '<p>In this part you will see two images on the screen at the same time. Please click on the image that you prefer.</p>'+
        '</div>',
      choices: ['Start Task'],
      data: {task: 'instructions'}
    }

    var instructions_completed = {
      type: 'html-button-response',
      stimulus: '<div class="instructions">'+
        '<p>End of the game! Click the button to continue to the next task.</p>'+
        '</div>',
      choices: ['Done'],
      data: {task: 'instructions'}
    }
    
    /* create training procedure */

    var num_shapes = null;
    var color = null;
    var size = null;
    var training_cue = {
      type: 'html-button-response',
      choices: ["1", "2", "3", "4"],
      stimulus: function(){
        num_shapes = jsPsych.randomization.sampleWithoutReplacement([1,2,3,4], 1)[0];
        color = jsPsych.randomization.sampleWithoutReplacement(["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"], 1)[0];
        size = jsPsych.randomization.sampleWithoutReplacement([30,40,50,60], 1)[0];
        var stim = generate_stimulus(jsPsych.timelineVariable('shape', true), num_shapes, color, size);
        return stim.node.outerHTML;
      },
      response_ends_trial: false,
      trial_duration: 1500,
      data: {
        task: 'number-identification',
        word: jsPsych.timelineVariable('word'),
        word_type: jsPsych.timelineVariable('word_type'),
        shape: jsPsych.timelineVariable('shape')
      },
      on_finish: function(data){
        data.num_shapes = num_shapes;
        data.color = color;
        data.size = size;
        data.responded = data.button_pressed !== null;
        data.correct = data.responded ? parseInt(data.button_pressed) + 1 == num_shapes : false;
      }
    }

    var training_feedback = {
      type: 'html-keyboard-response',
      stimulus: function(){
        var responded = jsPsych.data.get().filter({task: 'number-identification'}).last(1).values()[0].responded;
        var correct = jsPsych.data.get().filter({task: 'number-identification'}).last(1).values()[0].correct;
        if(responded){
          if(correct){
            return "<p class='train-word'>CORRECT</p>"
          } else {
            return "<p class='train-word'>INCORRECT</p>"
          }
        } else {
          return '<p>No response detected. Please try to respond faster in the next trial.</p>'
        }
      },
      post_trial_gap: 1000,
      choices: jsPsych.NO_KEYS,
      trial_duration: 1000
    }

    var training_word = {
      type: 'html-keyboard-response',
      stimulus: function(){
        var responded = jsPsych.data.get().filter({task: 'number-identification'}).last(1).values()[0].responded;
        if(responded){
          return "<p class='train-word'>" + jsPsych.timelineVariable('word', true) + "</p>"
        } else {
          return '<p>No response detected. Please try to respond faster in the next trial.</p>'
        }
      },
      post_trial_gap: 1000,
      choices: jsPsych.NO_KEYS,
      trial_duration: 1000
    }

    // var speed_nudge = {
    //   timeline: [{
    //     type: 'html-keyboard-response',
    //     stimulus: '<p>No response detected. Please try to respond faster in the next trial.</p>',
    //     trial_duration: 2000,
    //     post_trial_gap: 1000
    //   }],
    //   conditional_function: function(){
    //     var responded = jsPsych.data.get().filter({task: 'number-identification'}).last(1).values()[0].responded;
    //     return !responded;
    //   }
    // }

    /* create practice phase */

    var repeat_practice = {
      timeline: [{
        type: 'html-button-response',
        stimulus: '<p>You answered incorrectly or too slowly on one of the practice trials</p><p>Let\'s try the practice again.</p>',
        choices: ['Start practice']
      }],
      conditional_function: function(){
        var correct_trials = jsPsych.data.get().filter({phase: 'practice', task: 'number-identification'}).last(2).filter({correct: true}).count();
        return correct_trials < 2;
      }
    }

    var practice_phase = {
      timeline: [
        {
          timeline: [training_cue, training_feedback],
          timeline_variables: [
            {shape: positive_shape, word: null, word_type: null},
            {shape: negative_shape, word: null, word_type: null},
            {shape: neutral_shape_1, word: null, word_type: null},
            {shape: neutral_shape_2, word: null, word_type: null}
          ],
          sample: {
            type: 'without-replacement',
            size: 2
          }
        },
        repeat_practice
      ],
      data: {
        phase: 'practice'
      },
      loop_function: function(){
        var correct_trials = jsPsych.data.get().filter({phase: 'practice', task: 'number-identification'}).last(2).filter({correct: true}).count();
        return correct_trials < 2;
      }
    }

    var training_phase = {
      timeline: [training_cue, training_word],
      timeline_variables: training_phase_trials, 
      data: {
        phase: 'training'
      }
    }

    /* test phase */

    var test_trial = {
      type: 'html-button-response',
      stimulus: '<p>Which image do you prefer?</p>',
      choices: function(){
        var arr = [];
        
        num_shapes = jsPsych.randomization.sampleWithReplacement([1,2,3,4], 1)[0];
        color = jsPsych.randomization.sampleWithReplacement(["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"], 1)[0];
        size = jsPsych.randomization.sampleWithReplacement([30,40,50,60], 1)[0];
        var stim_a = generate_stimulus(jsPsych.timelineVariable('shape_a', true), num_shapes, color, size);
        var stim_b = generate_stimulus(jsPsych.timelineVariable('shape_b', true), num_shapes, color, size);
        
        return [stim_a.node.outerHTML, stim_b.node.outerHTML]
      },
      button_html: '<div class="test-image">%choice%</div>',
      trial_duration: 2000000,
      post_trial_gap: 1000,
      data: {
        top_shape: jsPsych.timelineVariable('shape_a'),
        bottom_shape: jsPsych.timelineVariable('shape_b'),
        task: 'preference'
      },
      on_finish: function(data){
        data.num_shapes = num_shapes;
        data.color = color;
        data.size = size;
        
        if(data.button_pressed == 0){
          data.shape_val = shape_vals[jsPsych.timelineVariable('shape_a', true)];
        }

        if(data.button_pressed == 1){
          data.shape_val = shape_vals[jsPsych.timelineVariable('shape_b', true)];
        }

        if(data.button_pressed === null){
          data.shape_val = null;
        }

      }
    }

    var test_phase = {
      timeline: [test_trial],
      timeline_variables: [
        {shape_a: positive_shape, shape_b: neutral_shape_1},
        {shape_a: neutral_shape_1, shape_b: positive_shape},
        {shape_a: negative_shape, shape_b: neutral_shape_2},
        {shape_a: neutral_shape_2, shape_b: negative_shape}
      ],
      sample: {
        type: 'fixed-repetitions',
        size: 10
      },
      data: {
        phase: 'test'
      }
    }

    /* save data */

    var save_data = {
      type: 'call-function',
      func: function(){
        
        var results = jsPsych.data.get().ignore("internal_node_id").ignore("stimulus").ignore("key_press").values();
        var score = 0;
        var outcomes = {};
        tmbSubmitToServer(results,score,outcomes);
        
        //jsPsych.data.get().ignore("internal_node_id").ignore("stimulus").ignore("key_press").localSave('csv', 'sample-implicit-bias-data.csv');
      }
    }

    /* assemble timeline */

    timeline.push(instructions_pre_training);
    timeline.push(practice_phase);
    timeline.push(instructions_post_practice);
    timeline.push(training_phase);
    timeline.push(instructions_pre_test);
    timeline.push(test_phase);
    timeline.push(save_data);
    timeline.push(instructions_completed);
    
    jsPsych.init({
      timeline: timeline
    });
