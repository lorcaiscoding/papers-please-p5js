# papers-please-p5js





Define a function "preload":
- Load images into 3 gamestates: description, gameover, and victory
- Generate some random numbers for photos of immigrants and their sequences in the library
- Load corresponding photos into 2 libraries based on chosen numbers to make 2 libraries have the same photos in the same specific sequences

Define a function "setup":
- Create a canvas
- Initialize color version of photos and grayscale version of photos from 2 libraries

Define a function "draw":
- Set the background and draw the passport
- Depending on the gamestate, display the corresponding images

Define a function "mousePressed":
- Specify the range of mouse clicks
- If the game is not over:
  - Check if the mouse click corresponds to a correct or incorrect pair: If the mouse clicks on the green rectangle and it corresponds to the same photos, or if the mouse clicks on the red rectangle and it corresponds to the different photos, update the score; If the mouse clicks on the green rectangle and it corresponds to the different photos, or if the mouse clicks on the red rectangle and it corresponds to the same photos, change the gamestate to gameover
  - Change the gamestate to victory if the score reaches 10

Define a function "keyPressed":
If the gamestate is description, change it to 'game' and start the game when the Enter key is pressed

Define a function "checkPairSimilarity":
- Define a similarity threshold
- Defining the distance of pixel sampling
- Gray color photos for better similarity comparisons
- Resize the grayscale photos to make them as big as color photos
- Calculate the Mean Squared Error (MSE) between the color and gray images
- Calculate the dissimilarity based on the MSE
- Check if the dissimilarity is below the threshold
- Return true if it is, else return false

Define a function "drawPictures":
- Display the color image at the top-left
- Draw a green rectangle on the left side
- Display the gray image at the top-right
- Draw a red rectangle on the right side
