function generate_stimulus(shape, number, color, size){
  
  var stim_width = 200;
  var stim_height = 200;
  var padding = 4;
  
  var stim = SVG().size(stim_width, stim_height);

  var stim_locs = [];

  if(shape == 'circle'){
    for(var i=0; i<number; i++){
      var x = Math.floor(Math.random()*(stim_width-size));
      var y = Math.floor(Math.random()*(stim_width-size));
      while(check_bb_collision(stim_locs, {x,y}, size, padding)){
        x = Math.floor(Math.random()*(stim_width-size));
        y = Math.floor(Math.random()*(stim_width-size));
      }
      stim_locs.push({x,y})
      stim.circle(size).move(x,y).attr({fill: color});
    }
  }

  if(shape == 'triangle'){
    for(var i=0; i<number; i++){
      var x = Math.floor(Math.random()*(stim_width-size));
      var y = Math.floor(Math.random()*(stim_width-size));
      while(check_bb_collision(stim_locs, {x,y}, size, padding)){
        x = Math.floor(Math.random()*(stim_width-size));
        y = Math.floor(Math.random()*(stim_width-size));
      }
      stim_locs.push({x,y})
      
      stim.polygon().plot([[x,y+size], [x+size/2,y],[x+size, y+size]]).attr({fill:color})
    }
  }

  if(shape == 'square'){
    for(var i=0; i<number; i++){
      var x = Math.floor(Math.random()*(stim_width-size));
      var y = Math.floor(Math.random()*(stim_width-size));
      while(check_bb_collision(stim_locs, {x,y}, size, padding)){
        x = Math.floor(Math.random()*(stim_width-size));
        y = Math.floor(Math.random()*(stim_width-size));
      }
      stim_locs.push({x,y})
      
      stim.rect(size,size).move(x,y).attr({fill:color})
    }
  }

  if(shape == 'star'){
    for(var i=0; i<number; i++){
      var x = Math.floor(Math.random()*(stim_width-size));
      var y = Math.floor(Math.random()*(stim_width-size));
      while(check_bb_collision(stim_locs, {x,y}, size, padding)){
        x = Math.floor(Math.random()*(stim_width-size));
        y = Math.floor(Math.random()*(stim_width-size));
      }
      stim_locs.push({x,y})
      
      stim.polygon().plot([
        [x + size*.5,y], 
        [x+size*.6,y+size*.4],
        [x+size,y+size*.5],
        [x+size*.6,y+size*.6],
        [x+size*.5,y+size],
        [x+size*.4,y+size*.6],
        [x,y+size*.5],
        [x+size*.4,y+size*.4]
      ]).attr({fill:color})
    }
  }
  
  return stim;
}

function check_bb_collision(existing_locs, new_loc, size, padding){
  if(existing_locs.length == 0){
    return false;
  }

  for(var i=0; i<existing_locs.length; i++){
    var x_min = existing_locs[i].x - size - padding;
    var x_max = existing_locs[i].x + size + padding;

    var y_min = existing_locs[i].y - size - padding;
    var y_max = existing_locs[i].y + size + padding;

    if(new_loc.x > x_min && new_loc.x < x_max){
      if(new_loc.y > y_min && new_loc.y < y_max){
        return true;
      }
    }
  }
  return false;
}