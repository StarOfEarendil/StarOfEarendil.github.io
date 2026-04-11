// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('custom-name');
const generateBtn = document.querySelector('.generate');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS

const storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';

const insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
const insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and slithered away'];

// 3. EVENT LISTENER AND PARTIAL GENERATE FUNCTION DEFINITION

generateBtn.addEventListener('click', result);

function result() {
  // Creates a new variable newStory set equal to storyText
  let newStory = storyText;

  // Creates three variables set by selecting a random element
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  // Uses newStory.replaceAll() to replace placeholders
  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replaceAll(':inserty:', yItem);
  newStory = newStory.replaceAll(':insertz:', zItem);

  // If user enters a name, replace 'Bob'
  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob', name);
  }

  // If UK radio is checked, convert weights and temperatures
  if(document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14) + ' stone';
    const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade';
    
    newStory = newStory.replaceAll('300 pounds', weight);
    newStory = newStory.replaceAll('94 fahrenheit', temperature);
  }

  // Sets the story.textContent equal to the modified newStory variable
  story.textContent = newStory;
  story.style.visibility = 'visible';
}