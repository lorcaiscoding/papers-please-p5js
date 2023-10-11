let gameState = 'description'; 
let description;
let gameover;
let victory;
let library1 = [];
let library2 = [];
let score = 0;
let gameOver = false;
let colorimage; 
let grayimage;





function preload() {
  description = loadImage('description.png');
  gameover = loadImage('gameover.png');
  victory = loadImage('victory.png');
  
  let imageCount = 10;
  let chosenImage = []; 
  let l1n = []; 
  let l2n = [];
  let chosenSequence = [];

  
  for (let i = 1; i <= imageCount; i++) {
    l1n.push(i);
    l2n.push(i);
  }
  shuffle(l1n, true);
  shuffle(l2n, true);


  for (let i = 0; i < 3; i++) {
    let randomImage = floor(random(1, imageCount));
    if(!chosenImage.includes(randomImage)){
      chosenImage.push(randomImage);
    } else {
      i--;
    }
  }
  
  for (let i = 0; i < 3; i++) {
    let randomSequence = floor(random(0, imageCount-1));
    if (!chosenSequence.includes(randomSequence)){
       chosenSequence.push(randomSequence);
      
       l1n[chosenSequence[i]] = chosenImage[i];
       l2n[chosenSequence[i]] = chosenImage[i];
      
    } else {
      i--;
    }
    
  }
  
    console.log("Chosen sequence:" + chosenSequence);
    console.log("Chosen image" + chosenImage);
    console.log(l1n);
    console.log(l2n);
    


  for (i = 0; i < imageCount; i++) { 
    library1.push(loadImage('library1/' + (l1n[i]) + 'color.png'));
    library2.push(loadImage('library2/' + (l2n[i]) + 'gray.png'));  
  }
}





function setup() {
  createCanvas(400, 400);
  noLoop();

  colorimage = library1[0];
  grayimage = library2[0];
}

function draw() {
  background(0);
  fill(239, 228, 222)
  rect(220, 50, 160, 120)
  fill(82, 47, 29)
  rect(230, 75, 55, 6)
  rect(230, 95, 30, 6)
  rect(230, 115, 40, 6)
  rect(230, 135, 50, 6)
  fill(171, 158, 154)
  noStroke()
  rect(280, 155, 80, 6)
  
if (gameState === 'description') {
        image(description, 0, 0, width, height); 
} else if (gameState === 'game') {
        drawPictures();
} else if (gameState === 'gameover') {
        image(gameover, 0, 0, width, height);
} else if (gameState === 'victory') {
        image(victory, 0, 0, width, height);
    }
}



function mousePressed() {
    if (!gameOver) {      

        if (mouseX >= 50 && mouseX <= 150 && mouseY >= 300 && mouseY <= 350) {
            
            let isPassportApproved = checkPairSimilarity();

            if (isPassportApproved) {
                score++;
            } else {
                gameState = 'gameover'; 
                noLoop()
            }

          
        } else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 300 && mouseY <= 350) {
            
            let isPassportApproved = checkPairSimilarity();

            if (!isPassportApproved) {
                score++;
            } else {
                gameState = 'gameover'; 
                noLoop()
            }
        }
      
      if (score === 10) {
            gameState = 'victory';
            noLoop();
        }
    }
}



function keyPressed() {
    if (keyCode === ENTER) {
        if (gameState === 'description') {
            gameState = 'game';
            loop(); 
        }
    }
}




function checkPairSimilarity() {
    let colorimage = library1[score];
    let grayimage = library2[score];

    let similarityThreshold = 4.81;
    let totalPixels = colorimage.width * colorimage.height;
    let sampleInterval = 5;

    colorimage.filter(GRAY)
  
    grayimage.resize(colorimage.width, colorimage.height);
  
    let mse = 0
    
    for (let x = 0; x < colorimage.width; x += sampleInterval) {
       for (let y = 0; y < colorimage.height; y += sampleInterval) {
            let pixel1 = colorimage.get(x, y);
            let pixel2 = grayimage.get(x, y);
 
            let grayValue1 = red(pixel1)
            let grayValue2 = red(pixel2) 
            
            mse += Math.pow(grayValue1 - grayValue2, 2)
    
        }
    }

            mse /= totalPixels / (sampleInterval * sampleInterval);
    
            let dissimilarity = mse / 255

    console.log("Dissimilarity:", dissimilarity);
    console.log("Threshold:", similarityThreshold);
  
    
    if (dissimilarity < similarityThreshold) {
        return true;
    } else {
        return false
    }
}






function drawPictures() {
      image(library1[score], 0, 0, 200, 200);
      fill("green");
      rect(50, 300, 100, 50);
      image(library2[score], 300, 75, 70, 70);
      fill("red");
      rect(250, 300, 100, 50);   
}


